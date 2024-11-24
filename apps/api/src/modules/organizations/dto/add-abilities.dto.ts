import { IsNumberString, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AddAbilityDto {
	@IsNumberString()
	code!: string;

	@IsString()
	action!: string;
}

export class AddAbilitiesDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AddAbilityDto)
	abilities!: AddAbilityDto[];
}

