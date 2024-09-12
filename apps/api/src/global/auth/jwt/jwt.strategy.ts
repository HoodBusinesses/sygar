import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * JwtStrategy class is responsible for validating JWT tokens.
 * It extends the PassportStrategy class and implements the Strategy interface.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Constructor to initialize the JwtStrategy with configuration settings
    constructor(private readonly config: ConfigService) {
        super({
            // Extract JWT from the Authorization header as a Bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Do not ignore the expiration date of the token
            ignoreExpiration: false,
            // Secret key to validate the JWT, fetched from the configuration service
            secretOrKey: config.get<string>('JWT_SECRET') || 'JWT_SECRET',
        });
    }

    // Method to validate the JWT payload
    async validate(payload: any) {
        // Return the payload if validation is successful
        return payload;
    }
}