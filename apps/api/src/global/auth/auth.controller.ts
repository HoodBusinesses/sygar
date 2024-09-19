import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './auth.guard';

/**
 * Auth controller
 */
@Controller('auth')
export class AuthController {
	// Inject the AuthService
	constructor(private readonly authService: AuthService) {}
	
	/**
	 * Login endpoint
	 * @param loginDto - The LoginDto instance
	 * @returns The login response
	 */
	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		// Call the login method from the AuthService and return the token response
		return this.authService.login(loginDto.email, loginDto.password);
	}

	/**
	 * Profile endpoint protected by the JwtGuard
	 * @param req - The request object
	 * 
	 * @returns The user profile without the password
	 */
	@Get('profile')
	@UseGuards(JwtGuard)
	async profile(@Req() req: any) {
		return req.user;
	}
}
