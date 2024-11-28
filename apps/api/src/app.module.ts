import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import path, { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './global/auth/auth.module';
import { DatabaseModule } from './lib/databse/database.module';
import { MailModule } from './lib/mail/mail.module';
import { EncryptionModule } from './lib/encryption/encryption.module';
import { TemplatesModule } from './lib/templates/templates.module';
import { JwtModule } from './lib/jwt/jwt.module';
import { OrganizationsModule } from './modules/organizations/organizations.modules';
import { AbilitiesModule } from './modules/abilities/abilities.module';
import { RbacModule } from './global/rbac/roles.module';

/**
 * @module AppModule
 * @description
 * This module is the root module of the application. It imports all the necessary modules and providers.
 */
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public/api'), serveRoot: '/api',
    }),
    AbilitiesModule,

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
    DatabaseModule,
    AuthModule,
    MailModule,
    EncryptionModule,
    TemplatesModule,
    JwtModule,
    OrganizationsModule,
    RbacModule
  ],
  controllers: [AppController],
})
export class AppModule { }
