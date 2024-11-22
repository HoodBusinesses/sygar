import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';
import {
  ResetPasswordDto,
} from './dto/reset-password.dto';
import { v4 as uuid } from 'uuid';
import { MailService } from '../mail/mail.service';
import {
  ActivateAccountDto,
} from './dto/activate-account.dto';
import { JwtService } from '../jwt/jwt.service';
import { EncryptionService } from '../encryption/encryption.service';
import { TemplatesService } from '../templates/templates.service';

@Injectable()
export class AuthService {
  private readonly jwtSecretToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly cryptService: EncryptionService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly templatesService: TemplatesService
  ) {
    this.jwtSecretToken = configService.getOrThrow('SYGAR_JWT_SECRET_TOKEN');
  }

  async login(email: string, password: string) {
    // Fetch user by email
    const user = await this.userService.getByFieldUnique('email', email);

    // Ensure user exists
    if (!user || !user.isActive) {
      throw new UnauthorizedException('invalidCredentials or Invalid User');
    }

    // Verify the provided password against the stored hash
    const isValid = user.password
      ? await this.cryptService.compare(user.password, password)
      : false;

    // If password is incoreect, throw unauthorized exception
    if (!isValid) {
      throw new UnauthorizedException('invalidCredentials');
    }

    // Generate Jwt Token for the use
    const token = this.jwtService.sing(
      {
        email: user.email,
        cnss: user.cnss,
        role: user.role,
      },
      {
        expiresIn: this.configService.getOrThrow('SYGAR_JWT_EXPIRATION_TIME'),
        secret: this.jwtSecretToken,
      }
    );

    return token
  }

  /**
   * Activates a user's account based on the provided token and new password.
   * @param dto - The ActivateAccountDto containing the token and new password.
   * @returns An object indicating the success of the activation process.
   */
  async activateAccount(dto: ActivateAccountDto) {
    // Get the user by the reset password token
    const user = await this.userService.getByField('resetToken', dto.token);

    console.log({ user })

    // If the user is not found, throw an unauthorized exception
    if (!user) {
      throw new UnauthorizedException('invalidToken');
    }

    // If the token is expired, throw an unauthorized exception
    if (
      user.resetTokenExpiresAt &&
      new Date(user.resetTokenExpiresAt) < new Date()
    ) {
      throw new UnauthorizedException('invalidToken'); // throw an unauthorized exception if the token is expired
    }

    // Hash the new password
    const newPasswordHash = await this.cryptService.hash(dto.password);

    // Update the password
    await this.userService.update(user.id, { password: newPasswordHash, passwordChangedAt: new Date(), isActive: true, resetToken: null, resetTokenExpiresAt: null });

    return {
      message: 'Account activated successfully',
    };
  }

  async requestActiveAccount(email: string) {

    // Generate a token
    const token = uuid();

    // Generate the reset link
    const resetLink = `${this.configService.getOrThrow('SYGAR_AUTH_WEB_APP_URL')}/${''}?token=${token}`;

    await this.sendTokenEmail(email, 'activationAccount', 'Sygar: Account Activate Email', token,
      { ['{{resetLink}}']: resetLink, ['{{organizationName}}']: 'SYGAR' })
  }

  private async sendTokenEmail(
    email: string,
    template: string,
    subject: string,
    token: string,
    changes: object
  ) { // Get the user by the email
    const user = await this.userService.getByFieldUnique('email', email);

    // If the user is not found, throw an unauthorized exception
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    // Set the reset password token for the user
    await this.userService.update(
      user.id,
      { resetTokenExpiresAt: expiresAt, resetToken: token }
    );

    // Load the activation account template
    const emailTemplate =
      await this.templatesService.getTemplate(template, { ...changes, ['{{username}}']: `${user.firstName} ${user.lastName}` });

    console.log(emailTemplate)

    // send the reset password email
    const mailOptions = {
      from: this.configService.getOrThrow('SYGAR_MAILER_FROM_ADDRESS'), // from address
      to: user.email, // to address
      subject, // subject
      html: emailTemplate,
    };

    // Send the reset password email
    try {
      await this.mailService.sendEmail(mailOptions);
    } catch (error: any) {
      // Delete the reset password token
      await this.userService.update(user.id, { resetToken: null, resetTokenExpiresAt: null });
      return { error: error.message };
    }

    // Return a message indicating that the activation email was sent
    return {
      message: 'email sent',
    };
  }

  async requestPasswordReset(email: string) {

    // Generate a token
    const token = uuid();

    // Generate the reset link
    const resetLink = `${this.configService.getOrThrow('SYGAR_AUTH_WEB_APP_URL')}/${''}?token=${token}`;

    await this.sendTokenEmail(email, 'resetPassword', 'Sygar: Account Reset password Email', token,
      { ['{{resetLink}}']: resetLink })

  }

  async resetPassword(dto: ResetPasswordDto) {
    // Get the user by the reset password token
    const user = await this.userService.getByField('resetToken', dto.token);

    // If the user is not found, throw an unauthorized exception
    if (!user) {
      throw new UnauthorizedException('invalidToken');
    }

    // If the token is expired, throw an unauthorized exception
    if (
      user.resetTokenExpiresAt &&
      new Date(user.resetTokenExpiresAt) < new Date()
    ) {
      throw new UnauthorizedException('tokenExpired');
    }

    // Hash the new password
    const newPasswordHash = await this.cryptService.hash(dto.newPassword);

    // Update the password
    await this.userService.update(user.id, { password: newPasswordHash, resetToken: null, resetTokenExpiresAt: null });

    // Delete the reset password token

    // Generate a token
    const token = this.jwtService.sing(
      {
        uid: user.id,
        email: user.email,
        cnss: user.cnss,
        role: user.role,
      },
      {
        expiresIn: this.configService.getOrThrow('SYGAR_JWT_EXPIRATION_TIME'),
        secret: this.jwtSecretToken,
      }
    );

    // Return a message indicating that the password was reset successfully
    return {
      message: 'Password reset successfully',
      token: token,
    };
  }
}
