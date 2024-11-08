import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @class DeleteUserDto
 * @description
 * This class is used to validate the data for deleting a user.
 */
export class DeleteUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user to be deleted',
    example: 'user@example.com',
  })
  email!: string;
}
