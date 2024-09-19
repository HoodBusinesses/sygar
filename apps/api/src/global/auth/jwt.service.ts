import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export interface JwtConfig {
	expiresIn: string,
	secret: string,
}

@Injectable()
export class JwtService {

  /**
   * Sign a payload and return the JWT token.
   * @param payload - The data to be included in the JWT.
   * @returns The signed JWT token.
   */
	sing(payload: object, config: JwtConfig): string {
		try {
			return jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
		} catch (error) {
			throw new Error('Failed to sign JWT token.');
		}
	}

  /**
   * Verify a JWT token and return the decoded payload.
   * @param token - The JWT token to verify.
	 * @param secret - The secret key used to sign the token.
   * @returns The decoded payload or throws an UnauthorizedException if invalid.
   */
	verify(token: string, secret: string): string | object {
		try {
			return jwt.verify(token, secret);
		} catch (error) {
      // Handle token errors (e.g., expired, invalid signature)
			throw new UnauthorizedException('Invalid or expired token.');
		}
	}

	  /**
   * Extracts the token from the authorization header.
   * @param authorizationHeader - The Authorization header in the format: 'Bearer token'.
   * @returns The extracted token or throws an UnauthorizedException if invalid.
   */
		extractToken(authorizationHeader: string): string {
			if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
				throw new UnauthorizedException('Invalid authorization header.');
			}
	
			// Extract the token from the header
			const token = authorizationHeader.split(' ')[1];
			if (!token) {
				throw new UnauthorizedException('Token not provided.');
			}
	
			// Return the extracted token
			return token;
		}
}