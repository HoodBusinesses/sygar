import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest<Request & { user: User }>();

	return req.user;
});


export const GetTargetUser = createParamDecorator((data, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest<Request & { targetUser: User }>();

	return req.targetUser;
});
