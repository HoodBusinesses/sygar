import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { UserService } from "src/modules/user/user.service";

@Injectable()

export class TargetUserExists implements NestInterceptor {

	constructor(private readonly userService: UserService) { }

	async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
		const req = context.switchToHttp().getRequest<Request>()

		const userId = req.body.userId || req.query.userId || req.params.userId;

		if (!userId)
			return next.handle()

		const user = await this.userService.getByFieldUnique('id', userId);

		if (!user) {
			throw new NotFoundException()
		}

		(req as any).targetUser = user;

		return next.handle()
	}
}
