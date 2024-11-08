import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GroupAction } from '../model/group.model';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a new group
 */
export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123456789', description: 'ID of the theme' })
  themeId!: string; // ID of the theme that the group belongs to

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Theme', description: 'Name of the theme' })
  theme!: string; // Name of the theme

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Location', description: 'Location of the group' })
  location!: string; // Location of the group

  @IsNotEmpty()
  @IsEnum(GroupAction)
  @ApiProperty({ example: 'Planned', description: 'Action of the group' })
  action!: GroupAction; // Action of the group eg: Planned, NotPlanned

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 123456789, description: 'Start date of the group' })
  startDate!: number; // Start date of the group

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 123456789, description: 'End date of the group' })
  endDate!: number; // End date of the group
}
