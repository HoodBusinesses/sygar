import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

// Dto for creating a theme
export class CreateThemeDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsNumber()
	cost!: number;

	@IsOptional()
	@IsArray({ each: true })
	groups!: ThemeGroup[];

	@IsOptional()
	@IsString()
	description?: string; // Optional description for the group

	@IsNotEmpty()
	@IsString()
	organizationId!: string;

	@IsNotEmpty()
	@IsNumber()
	startDate!: number;

	@IsNotEmpty()
	@IsNumber()
	endDate!: number;
}

export interface ThemeGroup {
	name: string; // Name of the group
	validated?: boolean; // Whether the participant list has been validated
}