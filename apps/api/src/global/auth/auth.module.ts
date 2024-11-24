import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './auth.guard';
import { UserModule } from 'src/modules/user/user.module';
import { MailModule } from 'src/lib/mail/mail.module';

/**
 * @module AuthModule
 * @description
 * This module is responsible for handling authentication and authorization services.
 * It is decorated with the `@Global()` decorator to ensure that the module is available globally throughout the application.
 */
@Global()
@Module({
  imports: [MailModule, UserModule],
  controllers: [AuthController],
  exports: [AuthService, JwtGuard,],
  providers: [AuthService, JwtGuard],
})
export class AuthModule { }
