import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user/user.service";
import { CryptService } from "./crypt.service";
import { JwtService } from "./jwt.service";
import { ResetPasswordDto, ResetPasswordRequestDto } from "./dto/reset-password.dto";
import { v4 as uuid } from "uuid";
import { MailService } from "../mail/mail.service";
import { UserRoles } from "src/modules/user/model/user.model";
import { ActivateAccountDto, ValidateTokenDto } from "./dto/activate-account.dto";
import { OrganizationService } from "src/modules/organization/organization.service";


@Injectable()
export class AuthService {

	private readonly jwtSecretToken: string;

	/**
	 * Constructor for the AuthService
	 * @param configService - The ConfigService instance
	 * @param userService - The UserService instance
	 * @param cryptService - The CryptService instance
	 * @param jwtService - The JwtService instance
	 * @param mailService - The MailService instance
	 */
	constructor(
		private readonly configService: ConfigService,
		@Inject(forwardRef(() => UserService)) private readonly userService: UserService,
		private readonly cryptService: CryptService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService,
		private readonly organizationService: OrganizationService
	) {
		this.jwtSecretToken = configService.getOrThrow('JWT_SECRET_TOKEN');
	}

	/**
	 * Logs in a user with provided username and password.
	 * Throws a BadRequestException if the username or password is missing.
	 * Throws an UnauthorizedException if the user is not found or password is invalid.
	 * Generates and returns a JWT token for the authenticated user.
	 *
	 * @param email - The user's email.
	 * @param password - The user's password.
	 * @returns Object containing the JWT token and user information.
	 */
	async login(email: string, password: string) {
		// Fetch user by email
		const user = await this.userService.getByEmail(email);

		// Ensure user exists
		if (!user) {
			throw new UnauthorizedException('invalidCredentials');
		}

		// Verify the provided password against the stored hash
		const isValid = await this.cryptService.compare(user.password, password);

		// If password is incoreect, throw unauthorized exception
		if (!isValid) {
			throw new UnauthorizedException('invalidCredentials');
		}

	
		// If the user is not active, send an email to the user to activate the account
		if (user.role !== UserRoles.SYGAR_ADMIN && !user.isActive) {
			await this.requestActiveAccount(user.email);
			throw new UnauthorizedException('accountNotActivated');
		}

		// Generate Jwt Token for the use
		const token = this.jwtService.sing(
			{
				uid: user.uid,
				email: user.email,
				cnss: user.cnss,
				role: user.role,
			},
			{
				expiresIn: this.configService.getOrThrow('JWT_EXPIRATION_TIME'),
				secret: this.jwtSecretToken,
			}
		);

		// Return the token and user information
		return {
			token,
			user: {
				uid: user.uid,
				email: user.email,
				cnss: user.cnss,
				role: user.role,
			},
		};
	}

	/**
	 * Activates a user's account based on the provided token and new password.
	 * @param dto - The ActivateAccountDto containing the token and new password.
	 * @returns An object indicating the success of the activation process.
	 */
	async activateAccount(dto: ActivateAccountDto) {
		// Get the user by the reset password token
		const user = await this.userService.getByResetPasswordToken(dto.token);

		// If the user is not found, throw an unauthorized exception
		if (!user) {
			throw new UnauthorizedException('invalidToken');
		}

		// If the token is expired, throw an unauthorized exception
		if (user.resetPasswordTokenExpiresAt && new Date(user.resetPasswordTokenExpiresAt) < new Date()) {
			throw new UnauthorizedException('invalidToken'); // throw an unauthorized exception if the token is expired
		}
	
		// Hash the new password
		const newPasswordHash = await this.cryptService.hash(dto.password);

		// Update the password
		await this.userService.updatePassword(user.uid, newPasswordHash);

		// Delete the reset password token
		await this.userService.setResetPasswordToken(user.uid, null, null);

		// Activate the user
		await this.userService.activateTheUser(user.uid);

		return {
			message: "Account activated successfully"
		}
	}

	/**
	 * Requests an activation email for a user.
	 * @param email - The user's email.
	 * @returns An object indicating the success of the activation email request.
	 */
	async requestActiveAccount(email: string) {
		// Get the user by the email
		const user = await this.userService.getByEmail(email);

		// If the user is not found, throw an unauthorized exception
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}
		
		// Generate a token
		const token = uuid();

		// Set the token expiration time to 30 minutes from now
		const expiresAt = new Date(Date.now() + 1800000);

		// Set the reset password token for the user
		await this.userService.setResetPasswordToken(user.uid, token, expiresAt);

		// Generate the reset link
		const resetLink = `${this.configService.getOrThrow('APP_URL')}/activateAccount?token=${token}`;

		// Load the activation account template
		const activationAccountTemplate = await this.mailService.getTemplate('activationAccount');

		// Replace the placeholders with the actual values
		let html = activationAccountTemplate.replace('{{resetLink}}', resetLink);
		html = html.replace('{{organizationName}}', (await this.organizationService.get(user.organizationId)).name);
		html = html.replace('{{username}}', `${user.firstName} ${user.lastName}`);

		// send the reset password email
		const mailOptions = {
			from: this.configService.getOrThrow('MAILER_FROM_ADDRESS'), // from address
			to: user.email, // to address
			subject: 'Activate your account', // subject
			html: html
		};

		// Send the reset password email
		try {
			await this.mailService.sendEmail(mailOptions);
		} catch (error: any) {
			// Delete the reset password token
			await this.userService.setResetPasswordToken(user.uid, null, null);
			return { error: error.message };
		}
		
		// Return a message indicating that the activation email was sent
		return {
			message: "Activation email sent"
		};
	}

	/**
	 * Requests a password reset email for a user.
	 * @param dto - The ResetPasswordRequestDto containing the user's email.
	 * @returns An object indicating the success of the password reset email request.
	 */
	async requestPasswordReset(dto: ResetPasswordRequestDto) {
		// Get the user by the email
		const user = await this.userService.getByEmail(dto.email);

		// If the user is not found, return a message indicating that the user was not found
		if (!user) {
			throw Error('userNotFound');
		}

		// Generate a token
		const token = uuid();
		const expiresAt = new Date(Date.now() + 1800000); // expires after 30 minutes from now

		// Set the reset password token for the user
		await this.userService.setResetPasswordToken(user.uid, token, expiresAt);

		// Generate the reset link
		const resetLink = `${this.configService.getOrThrow('APP_URL')}/resetPassword?token=${token}`;

		// Load the reset password template
		const resetPasswordTemplate = await this.mailService.getTemplate('resetPassword');

		// Replace the placeholders with the actual values
		let html = resetPasswordTemplate.replace('{{resetLink}}', resetLink);
		html = html.replace('{{username}}', `${user.firstName} ${user.lastName}`);

		// send the reset password email
		const mailOptions = {
		  from: this.configService.getOrThrow('MAILER_FROM_ADDRESS'),
		  to: user.email,
		  subject: 'Password Reset Request',
		  html: html,
		};

		// Send the reset password email
		try {
			await this.mailService.sendEmail(mailOptions);
		} catch (error: any) {
			// Delete the reset password token
			await this.userService.setResetPasswordToken(user.uid, null, null);
			throw Error(error.message);
		}

		// Return a message indicating that the password reset email was sent
		return {
			message: "Password reset email sent"
		};
	}

	/**
	 * Resets a user's password based on the provided token and new password.
	 * @param dto - The ResetPasswordDto containing the token and new password.
	 * @returns An object indicating the success of the password reset process.
	 */
	async resetPassword(dto: ResetPasswordDto) {
		// Get the user by the reset password token
		const user = await this.userService.getByResetPasswordToken(dto.token);

		// If the user is not found, throw an unauthorized exception
		if (!user) {
			throw new UnauthorizedException('Invalid token');
		}

		// If the token is expired, throw an unauthorized exception
		if (user.resetPasswordTokenExpiresAt && new Date(user.resetPasswordTokenExpiresAt) < new Date()) {
			throw new UnauthorizedException('Token expired');
		}

		// Hash the new password
		const newPasswordHash = await this.cryptService.hash(dto.newPassword);

		// Update the password
		await this.userService.updatePassword(user.uid, newPasswordHash);

		// Delete the reset password token
		await this.userService.setResetPasswordToken(user.uid, null, null);

		// Generate a token
		const token = this.jwtService.sing(
			{
				uid: user.uid,
				email: user.email,
				cnss: user.cnss,
				role: user.role,
			},
			{
				expiresIn: this.configService.getOrThrow('JWT_EXPIRATION_TIME'),
				secret: this.jwtSecretToken,
			}
		);
		
		// Return a message indicating that the password was reset successfully
		return {	
			message: "Password reset successfully",
			token: token
		}
	}

	
	/**
	 * Validates a token by checking if it exists in the database.
	 * @param token - The token to validate.
	 * @returns True if the token is valid, false otherwise.
	 */
	async validateToken(token: string): Promise<boolean> {
		// Get the user by the reset password token
		const user = await this.userService.getByResetPasswordToken(token);

		// If the user is not found, return false
		if (!user) {
			return false
		}

		// If the token is expired, return false
		if (user.resetPasswordTokenExpiresAt && new Date(user.resetPasswordTokenExpiresAt) < new Date()) {
			return false
		}

		// Return true if the token is valid
		return true
	}
}
