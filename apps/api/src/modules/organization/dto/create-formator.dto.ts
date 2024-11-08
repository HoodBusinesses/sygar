import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a new formator
 */
export class CreateFormatorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', description: 'First name of the formator' })
  firstName!: string; // the first name of the formator

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'Last name of the formator' })
  lastName!: string; // the last name of the formator

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the formator',
  })
  email!: string; // the email of the formator

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123456789',
    description: 'Organization ID of the formator',
  })
  organizationId!: string; // the organization id of the formator the formator belongs to
}
