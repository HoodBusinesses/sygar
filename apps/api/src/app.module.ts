import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './global/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './global/db/db.module';
import { TrainingModule } from './global/training/theme.module';
import path = require('path'); // Import the path module for path resolution
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { AbilityModule } from './modules/ability/ability.module';
import { RbacModule } from './global/rbac/roles.module';
import { LanguageModule } from './global/language/language.module';
import { NotificationsModule } from './global/notifactions/notifications.module';

/**
 * @module AppModule
 * @description
 * This module is the root module of the application. It imports all the necessary modules and providers.
 */
@Module({
  imports: [
    LanguageModule,
    AbilityModule,
    UserModule,
    AuthModule,
    OrganizationModule,
    RbacModule,
    // TODO: validate schema and load default env's
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: path.join(__dirname, "..", ".env"),
      // validationSchema,
      // validationOptions,
      // load: [appConfig(process.env.NODE_ENV)],
    }),
    DbModule,
    TrainingModule,
    // NotificationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
