import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// DTO for update organization
export class UpdateOrganizationDto {
	@IsOptional()
	@IsString()
	@ApiProperty({
		description: 'The name of the organization',
		example: 'My Organization',
	})
	name?: string;

	@IsOptional()
	@IsNumber()
	@ApiProperty({
		description: 'The number of free trial days available',
		example: 30,
	})
	freeTrial?: number;
}