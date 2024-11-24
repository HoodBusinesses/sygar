import { SetMetadata } from '@nestjs/common';
import { PUT_ABILITY } from 'src/shared/constants/roles';
import { RequirementsRules } from 'src/shared/types/roles';

/**
 * Decorator for defining the abilities required for request.
 *
 * @param requirements - The requirements for accessing the endpoint.
 * @returns A metadata object indicating the requirements for the request.
 */
export const PutAbilities = (...requirements: RequirementsRules[]) =>
  SetMetadata(PUT_ABILITY, requirements);
