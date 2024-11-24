import { IsOptional, IsString } from "class-validator";

export class UpdateOrganizationDto {
	@IsString()
	@IsOptional()
	name!: string;

	@IsString()
	@IsOptional()
	imageLink!: string;


	@IsString()
	@IsOptional()
	address!: string;

	@IsString()
	@IsOptional()
	ice!: string;

}
