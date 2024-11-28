import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Organization, User } from "@prisma/client";
import { Request } from "express";
import { AbilityFactory } from "src/global/rbac/rbac.service";
import { AbilitiesService } from "src/modules/abilities/abilities.service";
import { PUT_ABILITY } from "src/shared/constants/roles";
import { internalSubject, RequirementsRules } from "src/shared/types/roles";

@Injectable()
export class OrganizationsGuard implements CanActivate {
	constructor(
		private readonly abilitiesService: AbilitiesService,
		private readonly abilitiesFactory: AbilityFactory,
		private readonly reflector: Reflector
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {


		const rules = this.reflector.get<RequirementsRules[]>(
			PUT_ABILITY,
			context.getHandler(),
		) || [];


		const { organization, user, targetUser } = context.switchToHttp().getRequest<Request & { organization: Organization, user: User, targetUser: User }>()

		const userAbilities = await this.abilitiesService.getAllUserAbilities(user.id);
		const ability = this.abilitiesFactory.createForUser(user, userAbilities);

		rules.forEach(({ subject, action }) => {
			let subjectData: any;
			if (subject === 'Organization') {

				subjectData = internalSubject('Organization', organization)
			} else if (subject === 'Organization_Users') {

				subjectData = internalSubject('Organization_Users', { organization, user: targetUser })
			}

			const hasAbility = ability.can(action, subjectData);

			if (!hasAbility) {
				throw new ForbiddenException()
			}
		})

		return true;
	}
}
