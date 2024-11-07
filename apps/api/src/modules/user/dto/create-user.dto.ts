import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { NationalIdentifierTypes, UserRoles } from "../model/user.model";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @class CreateUserDto
 * @description
 * This class is used to validate the data for creating a new user.
*/
export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The CNSS of the user',
		example: '123456789',
	})
	cnss!: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The national identifier of the user',
		example: '987654321',
	})
	nationalIdentifier!: string;

	@IsEnum(NationalIdentifierTypes)
	@ApiProperty({
		description: 'The type of national identifier',
		example: NationalIdentifierTypes.CIN, // Replace with an actual value from NationalIdentifierTypes
	})
	nationalIdentifierType!: NationalIdentifierTypes;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The first name of the user',
		example: 'John',
	})
	firstName!: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The last name of the user',
		example: 'Doe',
	})
	lastName!: string;

	@IsEmail()
	@ApiProperty({
		description: 'The email address of the user',
		example: 'user@example.com',
	})
	email!: string;

	@IsString()
	@ApiProperty({
		description: 'The phone number of the user',
		example: '+1234567890',
	})
	phone!: string;

	@IsEnum(UserRoles)
	@ApiProperty({
		description: 'The role of the user',
		example: UserRoles.ORG_USER, // Replace with an actual value from UserRoles
	})
	role!: UserRoles;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The ID of the organization the user belongs to (optional)',
		example: 'org-123',
	})
	organizationId!: string;
}