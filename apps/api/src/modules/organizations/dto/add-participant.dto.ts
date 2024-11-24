import { IdentityType, Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";

export class AddParticipant {

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

	@IsEnum(Role)
	role!: Role;

	@IsString()
	organizationId!: string;
}
