import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for updating a theme
 */
export class UpdateThemeDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ example: "My theme description", description: "Optional description for the group" })
	description?: string; // Optional description for the group

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1633392000000, description: "Start date for the theme" })
	startDate?: number; // Optional start date for the theme

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1633392000000, description: "End date for the theme" })
	endDate?: number; // Optional end date for the theme
}
	