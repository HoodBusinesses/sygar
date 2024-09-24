import { IsNumber, IsOptional, IsString } from "class-validator";

// DTO for update organization
export class UpdateOrganizationDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsNumber()
	freeTrial?: number;
}