import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { Request } from 'express';

export const GetOrganization = createParamDecorator((data, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest<Request & { organization: Organization }>();
	return req.organization;
});
