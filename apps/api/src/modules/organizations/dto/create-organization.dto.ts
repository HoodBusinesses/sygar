import { IsEmail, IsEnum, IsNotEmptyObject, IsNumberString, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { IdentityType } from "@prisma/client";


export class AddOwner {

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

	@IsString()
	phone!: string;
}

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


	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => AddOwner)
	owner!: AddOwner;
}
