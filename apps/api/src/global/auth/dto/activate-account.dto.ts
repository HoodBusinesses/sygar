import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO for activating an account
 */
export class ActivateAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The activation token for the account',
    example: 'abc123token',
  })
  token!: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'The new password for the account',
    example: 'StrongPassword123',
  })
  password!: string;
}

