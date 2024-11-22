import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { NationalIdentifierTypes, UserRoles } from '../model/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { IdentityType, Role, UserType } from '@prisma/client';

/**
 * @class CreateUserDto
 * @description
 * This class is used to validate the data for creating a new user.
 */
export class CreateUserDto {

  @IsEnum(UserType)
  scope!: UserType;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    description: 'The CNSS of the user',
    example: '123456789',
  })
  cnss!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The national identifier of the user',
    example: '987654321',
  })
  identity!: string;

  @IsEnum(IdentityType)
  @ApiProperty({
    description: 'The type of national identifier',
    example: IdentityType.CIN, // Replace with an actual value from NationalIdentifierTypes
  })
  identityType!: IdentityType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName!: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email!: string;

  @IsString()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  phone!: string;

  @IsEnum(Role)
  @ApiProperty({
    description: 'The role of the user',
    example: Role.User, // Replace with an actual value from UserRoles
  })
  role!: Role;
  //
  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({
  //   description: 'The ID of the organization the user belongs to (optional)',
  //   example: 'org-123',
  // })
  // organizationId!: string;
}
