import { IsString } from "class-validator";
import { argv0 } from "process";

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
