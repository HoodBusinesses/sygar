import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JwtConfig {
	expiresIn: string;
	secret: string;
}

@Injectable()
export class JwtService {
	sing(payload: object, config: JwtConfig): string {
		try {
			return jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
		} catch (error) {
			throw new Error('faildSignJwtToken');
		}
	}

	verify(token: string, secret: string): string | object {
		try {
			return jwt.verify(token, secret);
		} catch (error) {
			// Handle token errors (e.g., expired, invalid signature)
			throw new UnauthorizedException('invalidToken');
		}
	}

	async verifyAsync(token: string, secret: string): Promise<string | object> {
		return new Promise((resolve, reject) => {
			jwt.verify(token, secret, (error, decoded) => {
				if (error) {
					reject(new UnauthorizedException('invalidToken'));
				} else {
					resolve(decoded as string | object);
				}
			});
		});
	}

	extractToken(authorizationHeader: string): string {
		if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
			throw new UnauthorizedException('invalidAuthHeader');
		}

		// Extract the token from the header
		const token = authorizationHeader.split(' ')[1];
		if (!token) {
			throw new UnauthorizedException('tokenNotProvided');
		}

		// Return the extracted token
		return token;
	}
}
