import { UsersService } from "../users/users.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as crypto from 'crypto';
import { User } from "src/shared/types/user";

@Injectable()
export class AuthService {
	// Constructor to inject necessary services: JwtService for token management,
	// and UsersService for user management.
	constructor(private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
	) {}

	// Method to validate a user by email and password.
    // It hashes the provided password and compares it with the stored hashed password.
    // Returns user details if validation is successful, otherwise returns null.
	async validateUser(email: string, password: string): Promise<any> {
		const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
		const user = await this.usersService.findByEmail(email);
		if (user && user.password === hashedPassword) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	// Method to generate a JWT token for a validated user.
	// The token payload includes user ID, role, email, and active status.
	async login(user: User) {
		return {
			access_token: this.jwtService.sign(user),
		};
	}
}