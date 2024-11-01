import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * DTO for creating a new animator
 */
export class CreateAnimatorDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'John', description: 'First name of the animator' })
	firstName!: string; // the first name of the animator

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'Doe', description: 'Last name of the animator' })
	lastName!: string; // the last name of the animator

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ example: 'john.doe@example.com', description: 'Email of the animator' })
	email!: string; // the email of the animator

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: '123456789', description: 'Organization ID of the animator' })
	organizationId!: string; // the organization id of the animator the animator belongs to
}
