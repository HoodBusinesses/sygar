import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { ThemeGroup } from "./create-theme.dto";

// Dto for updating theme
export class UpdateThemeDto {
	@IsOptional()
	@IsArray({ each: true })
	groups?: ThemeGroup[]; // Optional groups for the theme

	@IsOptional()
	@IsString()
	description?: string; // Optional description for the group

	@IsOptional()
	@IsNumber()
	startDate?: number; // Optional start date for the theme

	@IsOptional()
	@IsNumber()
	endDate?: number; // Optional end date for the theme
}
