import { IsEmail, IsString, MinLength } from "class-validator";

// DTO for login
export class LoginDto {
	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(8) // Password must be at least 8 characters long
	password!: string;
}