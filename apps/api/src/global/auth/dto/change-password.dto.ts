import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO for login
export class ChangePasswordDto {
  @IsString()
  oldPassword!: string;

  @IsString()
  newPassword!: string;
}
