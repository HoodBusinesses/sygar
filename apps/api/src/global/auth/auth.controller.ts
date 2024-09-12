import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { User } from 'src/shared/types/user';

@Controller('auth') // Defines a controller with the route prefix 'auth'
export class AuthController {
	constructor(private readonly authService: AuthService) {} // Injects the AuthService into the controller

	@Post('login') // Defines a POST route at 'auth/login'
	async login(@Body() LoginDto: { email: string; password: string }) {
		// Extracts email and password from the request body
		const user = await this.authService.validateUser(LoginDto.email, LoginDto.password);
		// Validates the user credentials
		if (user) {
			return this.authService.login(user); // Returns a JWT token if validation is successful
		}
		return { message: 'Invalid email or password' }; // Returns an error message if validation fails
	}

	@Get('profile') // Defines a GET route at 'auth/profile'
	@UseGuards(JwtAuthGuard) // Protects the route with JWT authentication
	getProfile(@Request() req: any) {
		return req.user as User; // Returns the authenticated user's profile
	}
}
