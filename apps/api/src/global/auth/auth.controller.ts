import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './auth.guard';
import { AbilitiesGuard } from '../rbac/rbac.guard';
import { PutAbilities } from '../rbac/roles.decorators';
import { Action } from 'src/shared/types/roles';
import { ResetPasswordDto, ResetPasswordRequestDto } from './dto/reset-password.dto';
import { ActivateAccountDto, ValidateTokenDto } from './dto/activate-account.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageService } from '../language/language.service';
import type { Response } from 'express';
import { randomBytes } from 'crypto';

/**
 * Auth controller
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
	// Inject the AuthService
	constructor(
		private readonly authService: AuthService,
		private readonly languageService: LanguageService
	) {}
	
	/**
	 * Login endpoint
	 * @param loginDto - The LoginDto instance
	 * @returns The login response
	 */
	@Post('login')
	@ApiOperation({ summary: 'Login' })
	@ApiResponse({ 
		status: 200, 
		description: 'Login successful.', 
		headers: {
			Authorization: {
				description: 'Access token',
				schema: {
					type: 'string',
					example : `Barear ${randomBytes(8).toString('hex')}.${randomBytes(8).toString('hex')}.${randomBytes(8).toString('hex')}`
				},
			},
		},
		schema: {
			example: {
				message: 'Login successful',
				date: '2021-09-01T12:00:00.000Z'
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
	async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res() res: Response) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			// Call the login method from the AuthService and return the token response
			const token = await this.authService.login(loginDto.email, loginDto.password);
			res.setHeader('Authorization', `Bearer ${token.token}`)
				.json({ message: 'Login successful', date: new Date().toISOString() });
		} catch (error: any) {
			throw new HttpException(this.languageService.getTranslation(error.message, lang), HttpStatus.BAD_REQUEST);
		}
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
	@ApiOperation({ summary: 'Get user profile' })
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
	@ApiResponse({ 
		status: 401, 
		description: 'Unauthorized.', 
		schema: {
			example: {
				error: 'Unauthorized'
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
	@ApiOperation({ summary: 'Forgot password' })
	@ApiResponse({ 
		status: 200, 
		description: 'Password reset request sent.', 
		schema: {
			example: {
				message: 'Password reset email sent successfully.',
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Invalid email.' })
	async forgotPassword(@Body() dto: ResetPasswordRequestDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return {
				message:  await this.authService.requestPasswordReset(dto),
				date: new Date().toISOString()
			};
		} catch (error: any) {
			throw new HttpException(this.languageService.getTranslation(error.message, lang), HttpStatus.BAD_REQUEST);
		}
	}
	
	/**
	 * Reset password endpoint
	 * @param dto - The ResetPasswordDto instance
	 * @returns The reset password response
	 */
	@Post('reset-password')
	@ApiOperation({ summary: 'Reset password' })
	@ApiResponse({ 
		status: 200, 
		description: 'Password reset successfully.', 
		schema: {
			example: {
				message: 'Password reset successfully',
			}
		}
	})
	@ApiResponse({ status: 401, description: 'Invalid token.' })
	async resetPassword(@Body() dto: ResetPasswordDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			return { ...await this.authService.resetPassword(dto), date: new Date().toISOString() };
		} catch (error: any) {
			throw new HttpException(this.languageService.getTranslation(error.message, lang), HttpStatus.UNAUTHORIZED);
		}
	}

	/**
	 * Activate account endpoint
	 * @param dto - The ActivateAccountDto instance
	 * @returns The activate account response
	 */
	@Post('activate-account')
	@ApiOperation({ summary: 'Activate account' })
	@ApiResponse({ 
		status: 200, 
		description: 'Account activated successfully.', 
		schema: {
			example: {
				message: 'Account activated successfully.',
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Invalid token.' })
	async activateAccount(@Body() dto: ActivateAccountDto, @Req() req: Request) {
		const header: Record<string, any> = req.headers;
		const lang = header['accept-language'] ?? 'en';

		try {
			await this.authService.activateAccount(dto);
			return { message: 'Account activated successfully', date: new Date().toISOString };
		} catch (error: any) {
			throw new HttpException(this.languageService.getTranslation(error.message, lang), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Validate token endpoint
	 * @param dto - The ValidateTokenDto instance
	 * @returns The validate token response
	 */
	@Post('validate-token')
	@ApiOperation({ summary: 'Validate token' })
	@ApiResponse({ 
		status: 200, 
		description: 'Token validation successful.', 
		schema: {
			example: {
				valid: true,
			}
		}
	})
	@ApiResponse({ status: 400, description: 'Invalid token.' })
	async validateToken(@Body() dto: ValidateTokenDto) {
		const valid =  await this.authService.validateToken(dto.token);
		if (valid) {
			return { valid };
		}
		throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
	}
}