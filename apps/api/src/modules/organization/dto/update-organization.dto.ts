import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for updating an organization
 */
export class UpdateOrganizationDto {
	@IsOptional()
	@IsString()
	@ApiProperty({
		description: 'The name of the organization',
		example: 'My Organization',
	})
	name?: string; // Name of the organization

	@IsOptional()
	@IsNumber()
	@ApiProperty({
		description: 'The number of free trial days available',
		example: 30,
	})
	freeTrial?: number; // Number of free trial days available
}