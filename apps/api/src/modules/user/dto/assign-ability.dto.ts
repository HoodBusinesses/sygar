import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AbilitiesEnum } from 'src/shared/constants/abilities';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @class AssignAbilityDto
 * @description
 * This class is used to validate the data for creating a new ability.
 */
export class AssignAbilityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'user-uid-123',
  })
  uid!: string; // user uid

  @IsEnum(AbilitiesEnum)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of ability being created',
    example: AbilitiesEnum.READ_USERS, // Replace with an actual value from AbilitiesEnum
  })
  abilityType!: AbilitiesEnum; // ability type

  @IsString()
  @IsOptional()
  @ApiProperty({
    description:
      'The ID of the organization (optional). If not provided, the ability will be global.',
    example: 'org-123',
  })
  organizationId?: string; // organization id (optional) if not provided, the ability will be global
}
