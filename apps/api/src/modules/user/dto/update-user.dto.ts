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
  [key: string]: any; // This is a hack to allow for index signature
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'user-uid-123',
  })
  uid!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The CNSS of the user',
    example: '123456789',
  })
  cnss?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The national identifier of the user',
    example: '987654321',
  })
  nationalIdentifier?: string;

  @IsOptional()
  @IsEnum(NationalIdentifierTypes)
  @ApiProperty({
    description: 'The type of national identifier',
    example: NationalIdentifierTypes.CIN, // Replace with an actual value from NationalIdentifierTypes
  })
  nationalIdentifierType?: NationalIdentifierTypes;

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

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The reset password token for the user',
    example: 'resetToken123',
  })
  resetPasswordToken?: string | null;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'The expiration date for the reset password token',
    example: '2023-12-31T23:59:59.999Z',
  })
  resetPasswordExpiresAt?: Date | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The new password for the user account',
    example: 'NewStrongPassword123',
  })
  password?: string;
}
