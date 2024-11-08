import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

/**
 * DTO for creating a new theme
 */
export class CreateThemeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'C++ Advanced', description: 'Name of the theme' })
  name!: string; // Name of the theme

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 100, description: 'Cost of the theme' })
  cost!: number; // Cost of the theme

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'My theme description',
    description: 'Optional description for the group',
  })
  description?: string; // Optional description for the group

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123456789',
    description: 'Organization ID of the organization creating the theme',
  })
  organizationId!: string; // Organization ID of the organization creating the theme the theme belongs to

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1633392000000,
    description: 'Start date for the theme',
  })
  startDate!: number; // Start date for the theme

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1633392000000,
    description: 'End date for the theme',
  })
  endDate!: number; // End date for the theme
}
