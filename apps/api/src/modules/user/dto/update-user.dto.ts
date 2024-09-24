import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { NationalIdentifierTypes } from "../model/user.model";

/**
 * @class UpdateUserDto
 * @description
 * This class is used to validate the data for updating a user.
*/
export class UpdateUserDto {
	[key : string]: any; // This is a hack to allow for index signature
	@IsNotEmpty()
	@IsString()
	uid!: string;

	@IsOptional()
	@IsString()
	cnss!: string;

	@IsOptional()
	@IsString()
	nationalIdentifier!: string;

	@IsEnum(NationalIdentifierTypes)
	nationalIdentifierType!: NationalIdentifierTypes;

	@IsOptional()
	@IsString()
	firstName!: string;

	@IsOptional()
	@IsString()
	lastName!: string;

	@IsOptional()
	@IsEmail()
	email!: string;

	@IsOptional()
	@IsString()
	phone!: string;
}