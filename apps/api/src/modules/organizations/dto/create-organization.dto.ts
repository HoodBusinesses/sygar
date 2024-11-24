import { IsNumberString, IsOptional, IsString, ValidateNested } from "class-validator";
import { AddParticipant } from "./add-participant.dto";

export class CreateOrganizationDto {
	@IsString()
	name!: string;

	@IsNumberString()
	cnss!: string;

	@IsString()
	@IsOptional()
	imageLink?: string;


	@IsString()
	address!: string;

	@IsString()
	ice!: string;

	@ValidateNested()
	owner!: AddParticipant;
}
