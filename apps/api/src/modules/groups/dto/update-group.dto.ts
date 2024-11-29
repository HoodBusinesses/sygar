import { IsOptional, IsString } from "class-validator";

export class UpdateGroupDto {

	@IsString()
	@IsOptional()
	trainerName?: string;

	@IsString()
	@IsOptional()
	animatorName?: string;

	@IsString()
	@IsOptional()
	address?: string;

	@IsString()
	organizationId!: string;
}
