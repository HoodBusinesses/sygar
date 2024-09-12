import { Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard is a custom authentication guard that extends the built-in AuthGuard class provided by the NestJS framework.
 * This guard is responsible for validating the JWT token and allowing access to routes that require authentication.
 * It uses the 'jwt' strategy for authentication.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}