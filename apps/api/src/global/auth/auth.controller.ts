import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './auth.guard';
import { AbilitiesGuard } from '../rbac/rbac.guard';
import { PutAbilities } from '../rbac/roles.decorators';
import { Action } from 'src/shared/types/roles';
import { ResetPasswordDto, ResetPasswordRequestDto } from './dto/reset-password.dto';
import { ActivateAccountDto, ValidateTokenDto } from './dto/activate-account.dto';

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
	@UseGuards(JwtGuard, AbilitiesGuard) // Protect the endpoint with JwtGuard and AbilitiesGuard
	@PutAbilities({
		action: Action.Read, // The action that the user can perform
		subject: 'User', // The subject that the user can perform the action on
	})
	async profile(@Req() req: any) {
		return req.user; // Return the user profile
	}

	/**
	 * Forgot password endpoint
	 * @param dto - The ResetPasswordRequestDto instance
	 * @returns The forgot password response
	 */
	@Post('forgot-password')
	async forgotPassword(@Body() dto: ResetPasswordRequestDto) {
		return this.authService.requestPasswordReset(dto);
	}
	
	/**
	 * Reset password endpoint
	 * @param dto - The ResetPasswordDto instance
	 * @returns The reset password response
	 */
	@Get('reset-password')
	async resetPassword(@Body() dto: ResetPasswordDto) {
		return this.authService.resetPassword(dto);
	}

	/**
	 * Activate account endpoint
	 * @param dto - The ActivateAccountDto instance
	 * @returns The activate account response
	 */
	@Get('activate-account')
	async activateAccount(@Body() dto: ActivateAccountDto) {
		return this.authService.activateAccount(dto);
	}

	/**
	 * Validate token endpoint
	 * @param dto - The ValidateTokenDto instance
	 * @returns The validate token response
	 */
	@Get('validate-token')
	async validateToken(@Body() dto: ValidateTokenDto) {
		return this.authService.validateToken(dto.token);
	}
}
