import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './auth.guard';
import {
  ResetPasswordDto,
  ResetPasswordRequestDto,
} from './dto/reset-password.dto';
import {
  ActivateAccountDto,
} from './dto/activate-account.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  // Inject the AuthService
  constructor(
    private readonly authService: AuthService,
  ) { }


  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ) {

    // Call the login method from the AuthService and return the token response
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password
    );
    return token;
  }


  @Get('me')
  @UseGuards(JwtGuard) // Protect the endpoint with JwtGuard and AbilitiesGuard
  async me(@Req() req: any) {
    return req.user; // Return the user profile
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() dto: ResetPasswordRequestDto,
  ) {
    return await this.authService.requestPasswordReset(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return await this.authService.resetPassword(dto)
  }

  @Post('activate-account')
  async activateAccount(@Body() dto: ActivateAccountDto) {
    await this.authService.activateAccount(dto);
    return {
      message: 'Account activated successfully',
      date: new Date().toISOString,
    };
  }

  @Get('activate-account')
  async requestActivateAccount(@Query('email') email: string) {
    return await this.authService.requestActiveAccount(email)
  }

  @Post('change-password')
  async changePassword(@Body() chngePasswordDto: ChangePasswordDto) { }
}
