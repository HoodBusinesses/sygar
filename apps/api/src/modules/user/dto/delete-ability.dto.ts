import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { AbilitiesEnum } from "../../../shared/constants/abilities";

/**
 * @class DeleteAbilityDto
 * @description
 * This class is used to validate the data for deleting an ability.
*/
export class DeleteAbilityDto {
    @IsString()
    @IsNotEmpty()
	uid!: string; // User ID

    @IsEnum(AbilitiesEnum)
    @IsNotEmpty()
    abilityType!: AbilitiesEnum; // Ability Type
}