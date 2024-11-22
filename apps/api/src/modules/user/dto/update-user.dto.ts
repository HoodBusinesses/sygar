import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NationalIdentifierTypes } from '../model/user.model';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @class UpdateUserDto
 * @description
 * This class is used to validate the data for updating a user.
 */
export class UpdateUserDto {

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  phone?: string;
}
