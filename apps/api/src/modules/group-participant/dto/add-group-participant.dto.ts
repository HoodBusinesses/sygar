import { IdentityType, ParticipantStatus, Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";

export class AddGroupParticipantDto {

	@IsNumberString()
	cnss!: string;

	@IsString()
	@IsOptional()
	imageLink?: string;

	@IsString()
	identity!: string;

	@IsEnum(IdentityType)
	identityType!: IdentityType;

	@IsString()
	firstName!: string;

	@IsString()
	lastName!: string;

	@IsEmail()
	email!: string;

	phone!: string;

	@IsEnum(ParticipantStatus)
	role!: ParticipantStatus;

	@IsString()
	groupId!: string;
}
