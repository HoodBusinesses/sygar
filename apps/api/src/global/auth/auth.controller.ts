import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './auth.guard';
import { AbilitiesGuard } from '../rbac/rbac.guard';
import { PutAbilities } from '../rbac/roles.decorators';
import { Action } from 'src/shared/types/roles';
import { ResetPasswordDto, ResetPasswordRequestDto } from './dto/reset-password.dto';
import { ActivateAccountDto, ValidateTokenDto } from './dto/activate-account.dto';
import { ApiResponse } from '@nestjs/swagger';

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
	@ApiResponse({ 
		status: 200, 
		description: 'Login successful.', 
		schema: {
			example: {
				token: 'your-access-token',
				user: {
					uid: 'user-123',
					email: 'user@example.com',
					cnss: '123456789',
					role: 'USER',
				},
			}
		}
	})
	@ApiResponse({ 
		status: 400, 
		description: 'Invalid credentials.', 
		schema: {
			example: {
				error: 'Invalid credentials'
			}
		}
	})
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
	@ApiResponse({ 
		status: 200, 
		description: 'User profile retrieved successfully.', 
		schema: {
			example: {
				uid: 'user-123',
				email: 'user@example.com',
				firstName: 'John',
				lastName: 'Doe',
			}
		}
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
	@ApiResponse({ 
		status: 200, 
		description: 'Password reset request sent.', 
		schema: {
			example: {
				message: 'Password reset email sent successfully.',
			}
		}
	})
	async forgotPassword(@Body() dto: ResetPasswordRequestDto) {
		return this.authService.requestPasswordReset(dto);
	}
	
	/**
	 * Reset password endpoint
	 * @param dto - The ResetPasswordDto instance
	 * @returns The reset password response
	 */
	@Post('reset-password')
	@ApiResponse({ 
		status: 200, 
		description: 'Password reset successfully.', 
		schema: {
			example: {
				message: 'Password reset successfully',
			}
		}
	})
	async resetPassword(@Body() dto: ResetPasswordDto) {
		return this.authService.resetPassword(dto);
	}

	/**
	 * Activate account endpoint
	 * @param dto - The ActivateAccountDto instance
	 * @returns The activate account response
	 */
	@Post('activate-account')
	@ApiResponse({ 
		status: 200, 
		description: 'Account activated successfully.', 
		schema: {
			example: {
				message: 'Account activated successfully.',
			}
		}
	})
	async activateAccount(@Body() dto: ActivateAccountDto) {
		return this.authService.activateAccount(dto);
	}

	/**
	 * Validate token endpoint
	 * @param dto - The ValidateTokenDto instance
	 * @returns The validate token response
	 */
	@Post('validate-token')
	@ApiResponse({ 
		status: 200, 
		description: 'Token validation successful.', 
		schema: {
			example: {
				valid: true,
			}
		}
	})
	async validateToken(@Body() dto: ValidateTokenDto) {
		return this.authService.validateToken(dto.token);
	}
}