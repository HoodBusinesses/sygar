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
import { ThemesModule } from './modules/themes/themes.module';
import { GroupParticipantModule } from './modules/group-participant/group-participants.module';
import { GroupModule } from './modules/groups/groups.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public/api'), serveRoot: '/api',
    }),
    AbilitiesModule,

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
    UserModule,

    MailModule,
    EncryptionModule,
    TemplatesModule,
    JwtModule,
    OrganizationsModule,
    GroupModule,
    GroupParticipantModule,
    RbacModule,
    ThemesModule
  ],
  controllers: [AppController],
})
export class AppModule { }
