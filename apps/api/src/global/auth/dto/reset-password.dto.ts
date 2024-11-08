import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordRequestDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email address associated with the account',
    example: 'user@example.com',
  })
  email!: string;
}

export class ResetPasswordDto {
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'The new password for the account',
    example: 'NewStrongPassword123',
  })
  newPassword!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The token for resetting the password',
    example: 'resetToken123',
  })
  token!: string;
}
