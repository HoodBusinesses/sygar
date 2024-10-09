import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { AbilitiesEnum } from "../../../shared/constants/abilities";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @class DeassignAbilityDto
 * @description
 * This class is used to validate the data for deassigning an ability.
 */
export class DeassignAbilityDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: 'user-uid-123',
    })
    uid!: string; // User ID

    @IsEnum(AbilitiesEnum)
    @IsNotEmpty()
    @ApiProperty({
        description: 'The type of ability being deassigned',
        example: AbilitiesEnum.READ_USERS, // Replace with an actual value from AbilitiesEnum
    })
    abilityType!: AbilitiesEnum; // Ability Type
}