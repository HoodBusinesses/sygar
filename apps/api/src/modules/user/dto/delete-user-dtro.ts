import { IsEmail, IsNotEmpty } from "class-validator";

/**
 * @class DeleteUserDto
 * @description
 * This class is used to validate the data for deleting a user.
*/
export class DeleteUserDto {
	@IsNotEmpty()
	@IsEmail()
	email!: string;
}