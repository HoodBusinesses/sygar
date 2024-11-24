import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { OrganizationsService } from "src/modules/organizations/organizations.service";

@Injectable()

export class OrganizationExists implements NestInterceptor {

	constructor(private readonly orgService: OrganizationsService) { }

	async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
		const req = context.switchToHttp().getRequest<Request>()

		const orgId = req.body.organizationId || req.query.organizationId || req.params.orgId;

		const org = await this.orgService.getOrgnizationByUnqiueField('id', orgId);

		if (!org) {
			throw new NotFoundException()
		}

		(req as any).organization = org;

		return next.handle()
	}
}
