import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import path, { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './global/databse/database.module';
import { AuthModule } from './global/auth/auth.module';
import { MailModule } from './global/mail/mail.module';
import { EncryptionModule } from './global/encryption/encryption.module';
import { TemplatesModule } from './global/templates/templates.module';
import { JwtModule } from './global/jwt/jwt.module';

/**
 * @module AppModule
 * @description
 * This module is the root module of the application. It imports all the necessary modules and providers.
 */
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public/api'), // Path to the `public/api` folder
      serveRoot: '/api', // Prefix for requests
    }),
    UserModule,
    // TODO: validate schema and load default env's
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: path.join(__dirname, '..', '.env'),
      // validationSchema,
      // validationOptions,
      // load: [appConfig(process.env.NODE_ENV)],
    }),
    // NotificationsModule,
    DatabaseModule,
    AuthModule,
    MailModule,
    EncryptionModule,
    TemplatesModule, JwtModule
  ],
  controllers: [AppController],
})
export class AppModule { }
