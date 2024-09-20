import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user/user.service";
import { CryptService } from "./crypt.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class AuthService {

	private readonly jwtSecretToken: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
		private readonly cryptService: CryptService,
		private readonly jwtService: JwtService,
	) {
		this.jwtSecretToken = configService.getOrThrow('JWT_SECRET_TOKEN');
	}

	/**
   * Logs in a user with provided username and password.
   * Throws a BadRequestException if the username or password is missing.
   * Throws an UnauthorizedException if the user is not found or password is invalid.
   * Generates and returns a JWT token for the authenticated user.
   *
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns Object containing the JWT token and user information.
   */
	async login(email: string, password: string) {
		// Ensure both email and password are provided
    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }

    // Fetch user by email
		const user = await this.userService.getByEmail(email);

		// Ensure user exists
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		// Verify the provided password against the stored hash
		const isValid = await this.cryptService.compare(user.password, password);

		// If password is incoreect, throw unauthorized exception
		if (!isValid) {
			throw new UnauthorizedException('Invalid credentials');
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
}