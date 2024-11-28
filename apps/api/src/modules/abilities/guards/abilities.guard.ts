import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Organization, User } from "@prisma/client";
import { Request } from "express";
import { AbilityFactory } from "src/global/rbac/rbac.service";
import { AbilitiesService } from "src/modules/abilities/abilities.service";
import { PUT_ABILITY } from "src/shared/constants/roles";
import { internalSubject, RequirementsRules } from "src/shared/types/roles";

@Injectable()
export class AbilitiesGuard implements CanActivate {
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


		const { user, targetUser, organization } = context.switchToHttp().getRequest<Request & { user: User, targetUser?: User, organization?: Organization }>()

		const userAbilities = await this.abilitiesService.getAllUserAbilities(user.id);
		const ability = this.abilitiesFactory.createForUser(user, userAbilities);

		rules.forEach(({ subject, action }) => {
			let subjectData = internalSubject('Ability', {
				consumer: targetUser,
				producer: user,
				organization,
			});

			const hasAbility = ability.can(action, subjectData);

			if (!hasAbility) {
				throw new ForbiddenException()
			}
		})

		return true;
	}
}
