import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

// DTO for login
export class LoginDto {
	@IsEmail()
	@ApiProperty({ example: 'user@example.com', description: 'User email for login' })
	email!: string;

	@IsString()
	@MinLength(8)
	@ApiProperty({ example: 'password123', description: 'User password for login' })
	password!: string;
}