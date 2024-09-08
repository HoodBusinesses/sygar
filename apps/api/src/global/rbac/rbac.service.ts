import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Action, Conditions, PossibleAbilities } from 'src/shared/types/roles';

/**
 * Factory class for creating user abilities based on their roles.
 */
@Injectable()
export class AbilityFactory {
  /**
   * Creates abilities for a user based on their roles.
   *
   * @param user - The user for whom to create abilities.
   * @returns An instance of the user's abilities.
   */
  createForUser(user: any) {
    const { can, build } = new AbilityBuilder(
      createMongoAbility<PossibleAbilities, Conditions>,
    );

    // Users
    if (user.roles.includes('user')) {
      // Define abilities for 'user' role if needed
    }

    // Admins
    if (user.roles.includes('admin') || user.roles.includes('super_admin')) {
      // Admins can manage all resources
      can(Action.Manage, 'all');
    }

    // Build and return the user's abilities
    return build();
  }
}
