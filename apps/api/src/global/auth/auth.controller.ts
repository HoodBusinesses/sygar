import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auh.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

/**
 * Controller responsible for handling authentication-related requests.
 */
@Controller('auth')
export class AuthController {
    // Injecting AuthService to handle authentication logic
    constructor(private readonly authService: AuthService) {}

    /**
     * Handles user login
     * @param LoginDto - Data Transfer Object containing user's email and password
     * @returns - JWT token if credentials are valid, otherwise an error message
     */
    @Post('login')
    async loging(@Body() LoginDto: { email: string, password: string }) {
        const user = await this.authService.validateUser(LoginDto.email, LoginDto.password);
        if (user) {
            return this.authService.login(user);
        }
        return { message: 'Invalid credentials'};
    }

    /**
     * Protected route example
     * @returns - A message indicating the route is protected and requires a valid JWT token
     */
    @Get('protected')
    @UseGuards(JwtAuthGuard)
    isAllowed() {
        return { message: 'This route is protected and accessible only with a valid JWT token.' };
    }
}