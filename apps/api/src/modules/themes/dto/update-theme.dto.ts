import { IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdateThemeDto {
	@IsString()
	@IsOptional()
	name?: string;

	@IsNumberString()
	@IsOptional()
	price?: string;

	@IsNumberString()
	@IsOptional()
	year?: string;


	@IsString()
	organizationId!: string;
}
