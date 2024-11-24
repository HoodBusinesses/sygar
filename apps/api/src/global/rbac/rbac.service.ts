import { ForbiddenException, Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, ForcedSubject } from '@casl/ability';
import { Action, AppAbility, SubjectMap } from 'src/shared/types/roles';
import { Role, User, Ability as UserAbility } from '@prisma/client';
import { ClientsAbilitiesEnum, OwnersAbilitiesEnum } from 'src/shared/constants/abilities';

const isOrganizationOwner = (user: User) => user.role === 'Owner' && user.organizationId;

const isOrganizationAdmin = (user: User) => user.role === 'Admin' && user.organizationId;

const isOrganizationUser = (user: User) => user.role === 'User' && user.organizationId;
const isSygarOwner = (user: User) => user.role === 'Owner' && !user.organizationId;

const isSygarAdmin = (user: User) => user.role === 'Admin' && !user.organizationId;

const isSygarUser = (user: User) => user.role === 'User' && !user.organizationId;


const hasAbility = (abilities: UserAbility[], ability: OwnersAbilitiesEnum | ClientsAbilitiesEnum) =>
  abilities.some(abilityObj => abilityObj.action === ability);


@Injectable()
export class AbilityFactory {

  ability: Ability | undefined;
  constructor(
  ) { }

  cannot<T extends keyof SubjectMap>(
    action: Action,
    subject: SubjectMap[T] & ForcedSubject<T>,
  ) {
    if (this.ability!.cannot(action, subject)) {
      throw new ForbiddenException()
    }
  }


  can<T extends keyof SubjectMap>(
    action: Action,
    subject: SubjectMap[T] & ForcedSubject<T>,
  ) {
    if (this.ability!.can(action, subject)) {
      return true;
    }
    throw new ForbiddenException()
  }

  createForUser(user: User, abilities: UserAbility[] = []) {
    const { can, build } = new AbilityBuilder<AppAbility>(Ability);


    if (isOrganizationOwner(user)) {
      can(Action.Manage, 'Organization', { id: user.organizationId })
      can(Action.Manage, 'Organization_Users',
        {
          ...(user ? { user: { organizationId: user.organizationId } } : {}),
          organization: { id: user.organizationId! }
        }
      )
    }

    if (isOrganizationAdmin(user)) {
      can(Action.Manage, 'Organization', { id: user.organizationId })
      can(Action.Read, 'Organization_Users',
        {
          ...(user ? { user: { organizationId: user.organizationId } } : {}),
          organization: { id: user.organizationId! }
        }
      )
    }

    if (isOrganizationUser(user)) {
      if (hasAbility(abilities, ClientsAbilitiesEnum.CLIENT_UPDATE_ORGANIZATIONS)) {
        can(Action.Update, 'Organization')
      }
    }

    // if (isOrganizationOwner(user)) {
    //   can(Action.Manage, 'Organization', { id: user.organizationId })
    //   can(Action.Manage, 'Organization_Users',
    //     {
    //       ...(user ? { user: { organizationId: user.organizationId } } : {}),
    //       organization: { id: user.organizationId! }
    //     }
    //   )
    //  }

    //
    // // sygar owner permissions
    // if (isSygarOwner(user)) {
    //   can(Action.Manage, 'Users');
    //   can(Action.Manage, 'Organization')
    //   can(Action.Manage, 'Ability')
    //   can(Action.Manage, 'Organization_Ability')
    //   can(Action.Manage, "Organization_Users")
    // }
    //
    // // sygar admin
    // if (isSygarAdmin(user)) {
    //   can(Action.Read, 'Users')
    //   can(Action.Manage, 'Organization_Ability')
    //   can(Action.Manage, 'Organization')
    //   can(Action.Manage, "Organization_Users")
    // }
    //
    // // sygar user
    // if (isSygarUser(user)) {
    //
    //   // manage entities
    //   if (hasAbility(abilities, OwnersAbilitiesEnum.OWNER_MANAGE_ORGANIZATIONS)) {
    //     can(Action.Manage, 'Organization')
    //   }
    //   if (hasAbility(abilities, OwnersAbilitiesEnum.OWNER_MANAGE_ORGANIZATION_PARTICIPANT)) {
    //     can(Action.Manage, 'Organization_Users')
    //
    //   }
    //
    //   // read entities
    //   if (hasAbility(abilities, OwnersAbilitiesEnum.OWNER_READ_ORGANIZATION)) {
    //     can(Action.Read, 'Organization')
    //   }
    //
    //   if (hasAbility(abilities, OwnersAbilitiesEnum.OWNER_READ_ORGANIZATION_PARTICIPANT)) {
    //     can(Action.Read, 'Organization_Users')
    //   }
    //
    //
    //   // create enitites
    //   if (hasAbility(abilities, OwnersAbilitiesEnum.OWNER_CREATE_ORGANIZATION_PARTICIPANT)) {
    //     can(Action.Create, 'Organization_Users')
    //   }
    //
    //   // DELETE enitities
    //   if (hasAbility(abilities, OwnersAbilitiesEnum.OWNER_DELETE_ORGANIZATION)) {
    //     can(Action.Delete, 'Organization')
    //   }
    //   if (hasAbility(abilities, OwnersAbilitiesEnum.OWNER_DELETE_ORGANIZATION_PARTICIPANT)) {
    //
    //     can(Action.Delete, 'Organization_Users')
    //   }
    //
    //   // update entities
    //   if (hasAbility(abilities, OwnersAbilitiesEnum.OWNER_UPDATE_ORGANIZATION)) {
    //     can(Action.Update, 'Organization')
    //   }
    //
    //   if (hasAbility(abilities, OwnersAbilitiesEnum.OWNER_UPDATE_ORGANIZATION_PARTICIPANT)) {
    //     can(Action.Update, 'Organization_Users')
    //     can(Action.Read, 'Organization_Users')
    //
    //   }
    // }

    this.ability = build()

    return this
  }
}
