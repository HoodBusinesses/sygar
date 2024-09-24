import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AbilitiesEnum } from "src/shared/constants/abilities";

/**
 * @class CreateAbilityDto
 * @description
 * This class is used to validate the data for creating a new ability.
*/
export class CreateAbilityDto {
	@IsString()
	@IsNotEmpty()
	uid!: string; // user uid

	@IsEnum(AbilitiesEnum)
	@IsNotEmpty()
	abilityType!: AbilitiesEnum; // ability type

	@IsString()
	@IsOptional()
	organizationId?: string; // organization id (optional) if not provided, the ability will be global
}