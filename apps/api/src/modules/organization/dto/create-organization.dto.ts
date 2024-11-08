import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO for create organization
export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123456789',
    description: 'CNSS of the organization',
  })
  cnss!: string; // CNSS of the organization

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'My Organization',
    description: 'Name of the organization',
  })
  name!: string; // Name of the organization

  @IsNumber()
  @ApiProperty({ example: 30, description: 'Free trial duration in days' })
  freeTrial!: number; // Free trial duration in days
}
