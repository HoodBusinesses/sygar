import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auh.service';
import { JwtStrategy } from './jwt/jwt.strategy';

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
        secret: configService.get('JWT_SECRET', 'JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  exports: [], 
  providers: [AuthService, JwtStrategy], 
})
export class AuthModule {}
