
import { IsNumberString, IsString, IsArray, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class RemoveAbilityDto {
	@IsNumberString()
	code!: string;
}

export class RemoveAbilitiesDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RemoveAbilityDto)
	abilities!: RemoveAbilityDto[];

	@IsString()
	userId!: string;

	@IsOptional()
	@IsString()
	organizationId?: string;
}
