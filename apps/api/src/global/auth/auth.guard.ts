import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "./jwt.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class JwtGuard implements CanActivate {
	private readonly jwtSecret: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,

	) {
		this.jwtSecret = this.configService.getOrThrow('JWT_SECRET_TOKEN');
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		// Extract the authorization header (expected format: 'Bearer <token>')
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw new UnauthorizedException('Authorization header is missing');
		}

		// Extract the token from the authorization header
		const token = this.jwtService.extractToken(authHeader);

		// Verify the token
		let payload: any;

		try {
			payload = this.jwtService.verify(token, this.jwtSecret);
		} catch (error: any) {
			throw new UnauthorizedException(error.message);
		}

		// Fetch the user from the database
		const user = await this.userService.getByEmail(payload.email);

		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		// Attach the user to the request object
		const { password, ...userWithoutPassword } = user;
		req.user = userWithoutPassword;

		// Allow the request to proceed
		return true;
	}
}
