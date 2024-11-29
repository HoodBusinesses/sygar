import { IsString } from "class-validator";

export class CreateGroupDto {

	@IsString()
	trainerName!: string;

	@IsString()
	animatorName!: string;

	@IsString()
	address!: string;

	@IsString()
	organizationId!: string;

	@IsString()
	themeId!: string;
}
