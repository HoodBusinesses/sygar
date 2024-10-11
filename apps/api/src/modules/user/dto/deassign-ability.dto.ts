import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { AbilitiesEnum } from "../../../shared/constants/abilities";

/**
 * @class deassignAbilityDto
 * @description
 * This class is used to validate the data for deleting an ability.
*/
export class deassignAbilityDto {
    @IsString()
    @IsNotEmpty()
	uid!: string; // User ID

    @IsEnum(AbilitiesEnum)
    @IsNotEmpty()
    abilityType!: AbilitiesEnum; // Ability Type
}