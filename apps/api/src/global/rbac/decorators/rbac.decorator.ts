import { SetMetadata } from '@nestjs/common';
import { Subject } from '@casl/ability';
import { Action, SubjectMap } from 'src/shared/types/roles';
import { PUT_ABILITY } from 'src/shared/constants/roles';

export interface RequirementsRules {
  action: Action;
  subject: keyof SubjectMap;
}

export const PutAbilities = (...requirements: RequirementsRules[]) =>
  SetMetadata(PUT_ABILITY, requirements);
