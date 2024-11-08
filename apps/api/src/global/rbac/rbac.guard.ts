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
import { LanguageService } from '../language/language.service';

/**
 * Guard that checks if a user has the necessary abilities to perform an action on a resource.
 */
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // Reflector service to access metadata
    private abilityFactory: AbilityFactory, // AbilityFactory service to create abilities
    private readonly languageService: LanguageService
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
      this.reflector.get<RequirementsRules[]>(
        PUT_ABILITY,
        context.getHandler()
      ) || [];

    // Get the request object from the context
    const req = context.switchToHttp().getRequest<Request & { user: User }>();
    const user: User = req.user; // Get the user object
    const organizationId = req.body.orgamizationId ?? req.body.cnss; // Dynamic organization ID from request body
    const lang = req.headers['accept-language'] ?? 'en';

    // Create an ability instance for the current user
    const ability = await this.abilityFactory.createForUser(user);

    // Loop through each rule and check if the user's ability allows the action
    for (const rule of rules) {
      if ([UserRoles.ORG_USER, UserRoles.ORG_ADMIN].includes(user.role)) {
        if (!organizationId) {
          throw new ForbiddenException(
            this.languageService.getTranslation('orgIdRequiredForOrgUser', lang)
          );
        }

        // Check if the user has the necessary abilities with organization ID
        if (!ability.can(rule.action, rule.subject, organizationId)) {
          throw new ForbiddenException(
            this.languageService.getTranslation(
              'userDoesNotHaveAbilities',
              lang
            )
          );
        }
      } else {
        // Check if the user has the necessary abilities without organization ID
        if (!ability.can(rule.action, rule.subject)) {
          throw new ForbiddenException(
            this.languageService.getTranslation(
              'userDoesNotHaveTheNecessaryAbilities',
              lang
            )
          );
        }
      }
    }

    // If the user has the necessary abilities, return true to allow access
    return true;
  }
}
