import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IdentityType, Role, UserType } from '@prisma/client';

export class CreateUserDto {

  @IsNumberString()
  cnss!: string;

  @IsString()
  identity!: string;

  @IsEnum(IdentityType)
  identityType!: IdentityType;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

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
