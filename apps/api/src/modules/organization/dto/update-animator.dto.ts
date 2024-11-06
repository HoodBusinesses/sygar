import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

/**
 * DTO for updating an animator
 */
export class UpdateAnimatorDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'John', description: 'First name of the animator' })
	firstName?: string; // First name of the animator

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Doe', description: 'Last name of the animator' })
	lastName?: string; // Last name of the animator

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'John Doe', description: 'Name of the animator' })
	name?: string; // Name of the animator

	@IsOptional()
	@IsEmail()
	@ApiProperty({ example: 'john.doe@example.com', description: 'Email of the animator' })
	email?: string; // Email of the animator
}
