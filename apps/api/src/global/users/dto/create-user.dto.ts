import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Roles } from 'src/shared/constants/roles.enums';
import { NationIdentifierTypes } from 'src/shared/constants/nit.enums';

/**
 * Data transfer object for creating a user.
*/
export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  cnss!: string;

  @IsNotEmpty()
  @IsString()
  nationalIdentifier!: string;

  @IsNotEmpty()
  @IsEnum(NationIdentifierTypes)
  nationalIdentifierType!: NationIdentifierTypes;

  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8) // Minimum length for passwords
  password!: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  role!: Roles;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
