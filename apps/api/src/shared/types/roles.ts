import { MongoAbility, MongoQuery, subject } from '@casl/ability';
import { Subjects } from '@casl/prisma';
import { AbilitiesEnum } from '../constants/abilities';
import { Ability, Organization, User } from '@prisma/client';

/**
 * Enum representing different actions that can be performed on a resource.
 */
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type SubjectMap = {
  'Users': User,
  'Organization': Organization,
  'Organization_Users': { user: User, organization: Organization },
  'Ability': {
    consumer: User,
    producer: User,
    ability: Ability,
  },
  'Organization_Ability': {
    consumer: User,
    producer: User,
    ability: Ability,
    organization: Organization
  }
}

/**
 * Type representing the subject of an action, which can be a specific subject or 'all'.
 */
export type Subject = Subjects<SubjectMap> | 'all';

export const internalSubject = <T extends keyof SubjectMap>(
  key: T,
  args: SubjectMap[T]
) => {
  return subject(key, args)
}


/**
 * Type representing the possible abilities, which is a tuple of Action and Subject.
 */
export type PossibleAbilities = [Action, Subject];

/**
 * Type representing conditions for filtering queries, using MongoDB query syntax.
 */
export type Conditions = MongoQuery;

/**
 * Type representing the application's ability, which is based on the MongoAbility from @casl/ability.
 */
export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

/**
 * Interface representing the requirements rules for defining abilities required for a specific action on a subject.
 */
export interface RequirementsRules {
  action: Action; // The action required, such as 'create', 'read', 'update', or 'delete'.
  subject: Subject; // The subject or resource type on which the action is performed, or 'all' for all resources.
  ability?: AbilitiesEnum
}
