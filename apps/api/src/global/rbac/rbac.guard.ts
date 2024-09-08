import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ForbiddenError, subject } from '@casl/ability';
import { AbilityFactory } from './rbac.service';
import { Action, RequirementsRules } from '../../shared/types/roles';
import { PUT_ABILITY } from '../../shared/constants/roles';

/**
 * Guard that checks if a user has the necessary abilities to perform an action on a resource.
 */
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}

  /**
   * Checks if the user has the necessary abilities to perform the action on the subject.
   *
   * @param context - The execution context.
   * @returns A boolean indicating whether the user has the necessary abilities.
   * @throws ForbiddenException if the user does not have the necessary abilities.
   */
  canActivate(context: ExecutionContext): boolean {
    // Get the rules for the action from the metadata
    const rules =
      this.reflector.get<RequirementsRules[]>(
        PUT_ABILITY,
        context.getHandler(),
      ) || [];

    // Get the request object from the context
    const req = context.switchToHttp().getRequest<Request>();

    // Create an ability instance for the current user
    const ability = this.abilityFactory.createForUser((req as any).user as any);

    try {
      // Check if the user has the required abilities for each rule
      rules.forEach((rule) => {
        const subjectName = rule.subject.toString();
        const subjectValue = req[subjectName.toLowerCase() as keyof typeof req];
        // Check if the user can perform the action on the subject
        ForbiddenError.from(ability).throwUnlessCan(
          rule.action,
          // If the action is read, update, or delete, create a subject using the subject's name and value else pass just the subject's name
          [Action.Delete, Action.Update, Action.Read].includes(rule.action)
            ? subject(subjectName, subjectValue)
            : rule.subject,
        );
      });
    } catch (error) {
      // If the user does not have the necessary abilities, throw a ForbiddenException
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }

    // If the user has the necessary abilities, return true to allow access
    return true;
  }
}
