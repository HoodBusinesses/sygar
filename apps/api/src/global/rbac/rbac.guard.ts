import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AbilityFactory } from './rbac.service';
import { RequirementsRules } from '../../shared/types/roles';
import { PUT_ABILITY } from '../../shared/constants/roles';
import { User, UserRoles } from 'src/modules/user/model/user.model';

/**
 * Guard that checks if a user has the necessary abilities to perform an action on a resource.
 */
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // Reflector service to access metadata
    private abilityFactory: AbilityFactory, // AbilityFactory service to create abilities
  ) {}

  /**
   * Checks if the user has the necessary abilities to perform the action on the subject.
   *
   * @param context - The execution context.
   * @returns A boolean indicating whether the user has the necessary abilities.
   * @throws ForbiddenException if the user does not have the necessary abilities.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the rules for the action from the metadata
    const rules: RequirementsRules[] =
      this.reflector.get<RequirementsRules[]>(PUT_ABILITY, context.getHandler()) || [];

    // Get the request object from the context
    const req = context.switchToHttp().getRequest<Request & { user: User }>();
    const { organizationId } = req.body; // Dynamic organization ID from request body
    const user: User = req.user; // Get the user object

    // Create an ability instance for the current user
    const ability = await this.abilityFactory.createForUser(user);

    // Loop through each rule and check if the user's ability allows the action
    for (const rule of rules) {
      if ([UserRoles.ORG_USER, UserRoles.ORG_ADMIN].includes(user.role)) {
        if (!organizationId) {
          throw new ForbiddenException(
            'Organization ID is required for organization user and admin',
          );
        }

        // Check if the user has the necessary abilities with organization ID
        if (!ability.can(rule.action, rule.subject, organizationId)) {
          throw new ForbiddenException('User does not have the necessary abilities for this organization'); 
        }
      } else {
        // Check if the user has the necessary abilities without organization ID
        if (!ability.can(rule.action, rule.subject)) {
          throw new ForbiddenException('User does not have the necessary abilities');
        }
      }
    }

    // If the user has the necessary abilities, return true to allow access
    return true;
  }
}
