import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @class DeleteOrganizationDto
 * @description
 * This class is used to validate the data for deleting a organization.
*/
export class DeleteOrganizationDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({
		description: 'The cnss of the organization to be deleted',
		example: '123456789',
	})
	cnss!: string;
}