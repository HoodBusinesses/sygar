import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder } from '@casl/ability';
import { Action, AppAbility } from 'src/shared/types/roles';
import { User } from 'src/modules/user/model/user.model';
import { UserRoles } from 'src/modules/user/model/user.model';
import { DbConstants } from '../db/db.constants';
import { AbilityService } from 'src/modules/ability/abiliry.service';

/**
 /**
 * Creates abilities for a user based on their role and fetched abilities.
 * If the user is an Org Admin, they can manage users within their organization.
 * If the user is a Sygar User, permissions are dynamically fetched from the AbilityService.
 * If the user is a Org User, permissions within their organization are dynamically fetched from the AbilityService.
 * @param user - The user whose abilities are being defined.
 * @returns The user's defined ability based on role and organization context.
 */
@Injectable()
export class AbilityFactory {
  constructor(
    private readonly abilityService: AbilityService,
    private readonly dbConstants: DbConstants
  ) {}

  async createForUser(user: User): Promise<Ability> {
    const { can, build } = new AbilityBuilder<AppAbility>(Ability);

    // Full control for Sygar Admin
    if (user.role === UserRoles.SYGAR_ADMIN) {
      can(Action.Manage, 'all');
    }

    // Organization Admin Permissions
    else if (user.role === UserRoles.ORG_ADMIN) {
      if (!user.organizationId) {
        throw new Error('Organization ID is required for organization admin');
      }
      can(Action.Manage, 'User', { organizationId: user.organizationId });
      can(Action.Manage, 'Ability', { organizationId: user.organizationId });
      can(Action.Manage, 'Theme', { organizationId: user.organizationId });
    }

    // Organization User and Sygar User
    else {
      // Fetch abilities for SYGAR_USER and ORG_USER
      const abilities = await this.abilityService.getAbilities(
        user.uid,
        user.organizationId
      );

      if (!abilities || abilities.length === 0) {
        // Default no abilities case
        throw new Error('No abilities defined for this user.');
      }

      for (const ability of abilities) {
        if (user.role === UserRoles.ORG_USER) {
          // Ensure actions are scoped to the user's organization
          can(ability.action, ability.subject, {
            organizationId: user.organizationId,
          });
        } else if (user.role === UserRoles.SYGAR_USER) {
          // Sygar User has specific permissions
          can(ability.action, ability.subject);
        }
      }
    }

    // Return the finalized ability object
    return build();
  }
}
