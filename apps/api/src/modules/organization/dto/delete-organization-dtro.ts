import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @class DeleteOrganizationDto
 * @description
 * This class is used to validate the data for deleting a organization.
*/
export class DeleteOrganizationDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The cnss of the organization to be deleted',
		example: '123456789',
	})
	cnss!: string; // The cnss of the organization to be deleted
}