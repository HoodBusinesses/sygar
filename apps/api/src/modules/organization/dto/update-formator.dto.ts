import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for updating a formator
 */
export class UpdateFormatorDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John', description: 'First name of the formator' })
  firstName?: string; // First name of the formator

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'Last name of the formator' })
  lastName?: string; // Last name of the formator

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'Name of the formator' })
  name?: string; // Name of the formator

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the formator',
  })
  email?: string; // Email of the formator
}
