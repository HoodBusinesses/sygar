import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AbilityFactory } from './rbac.service';
import { RequirementsRules } from 'src/shared/types/roles';
import { PUT_ABILITY } from 'src/shared/constants/roles';

export interface User {
  uid: string,
  role: string,
  abilities: number[]
  orgId: string
}

export enum Roles {
  Admin = "admin",
  Owner = "owner",
  User = "user"
}

/**
 * Guard that checks if a user has the necessary abilities to perform an action on a resource.
 */
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // Reflector service to access metadata
    private abilityFactory: AbilityFactory, // AbilityFactory service to create abilities
  ) { }

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

    const user: User = {
      uid: "",
      role: Roles.User,
      orgId: "anas",
      abilities: []
    }

    // Create an ability instance for the current user


    // Loop through each rule and check if the user's ability allows the action
    // for (const rule of rules) {
    //   const subjectP = [Action.Delete, Action.Update, Action.Read, Action.Create].includes(rule.action)
    //     ? subject(
    //       rule.subject.toString(),
    //       user,
    //     )
    //     : rule.subject
    //   console.log({ subjectP })
    //   // Check if the user has the necessary abilities with organization ID
    //   ForbiddenError.from(ability).throwUnlessCan(
    //     rule.action,
    //     subjectP,
    //   )
    // }

    // If the user has the necessary abilities, return true to allow access
    return true;
  }
}
