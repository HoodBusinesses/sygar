import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/lib/jwt/jwt.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.jwtSecret = this.configService.getOrThrow('SYGAR_JWT_SECRET_TOKEN');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      // Extract the authorization header (expected format: 'Bearer <token>')
      const authHeader = req.headers.authorization;
      const lang = req.headers['accept-language'] ?? 'en';
      if (!authHeader) {
        throw new UnauthorizedException(
        );
      }

      // Verify the token
      let payload: any;

      try {
        const token = this.jwtService.extractToken(authHeader);
        // Extract the token from the authorization header
        payload = this.jwtService.verify(token, this.jwtSecret);
      } catch (error: any) {
        throw new UnauthorizedException(
        );
      }

      // Fetch the user from the database
      const user = await this.userService.getByField('email', payload.email);

      if (!user) {
        throw new UnauthorizedException(
        );
      }

      // Attach the user to the request object
      const { password, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;

      // Allow the request to proceed
      return true;
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
