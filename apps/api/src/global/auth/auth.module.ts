import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';

/**
 * The `AuthModule` is responsible for handling authentication-related functionality.
 * It is a global module that provides the necessary imports, controllers, providers, and exports.
 * 
 * @remarks
 * This module imports the `JwtModule` asynchronously, using the `ConfigModule` and `ConfigService` to configure the JWT secret and sign options.
 * It also imports the `PassportModule` for handling authentication with Passport.
 * 
 * @publicApi
 */
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}