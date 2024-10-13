import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { CryptService } from './crypt.service';
import { JwtGuard } from './auth.guard';
import { MailModule } from '../mail/mail.module';
import { UserService } from 'src/modules/user/user.service';
import { NotificationService } from '../notifactions/notifications.service';
import { NotificationsGetWay } from '../notifactions/notifications.gateway';
import { LanguageModule } from '../language/language.module';

/**
 * @module AuthModule
 * @description
 * This module is responsible for handling authentication and authorization services.
 * It is decorated with the `@Global()` decorator to ensure that the module is available globally throughout the application.
 */
@Global()
@Module({
  imports: [MailModule, LanguageModule],
  controllers: [AuthController],
  exports: [AuthService, JwtService, JwtGuard],
  providers: [AuthService, JwtService, CryptService, JwtGuard, UserService, NotificationService, NotificationsGetWay],
})
export class AuthModule {}
