

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { NationalIdentifierTypes, UserRoles } from "../model/user.model";

/**
 * @class CreateUserDto
 * @description
 * This class is used to validate the data for creating a new user.
*/
export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	cnss!: string;

	@IsNotEmpty()
	@IsString()
	nationalIdentifier!: string;

	@IsEnum(NationalIdentifierTypes)
	nationalIdentifierType!: NationalIdentifierTypes;

	@IsNotEmpty()
	@IsString()
	firstName!: string;

	@IsNotEmpty()
	@IsString()
	lastName!: string;

	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(8)
	password!: string;

	@IsString()
	phone!: string;

	@IsEnum(UserRoles)
	role!: UserRoles;

	@IsOptional()
	@IsString()
	organizationId!: string;
}