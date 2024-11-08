import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ParticipantStatus } from '../model/participant.model';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for updating a participant
 */
export class UpdateParticipantDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'John',
    description: 'First name of the participant',
  })
  firstName?: string; // First name of the participant

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'Last name of the participant' })
  lastName?: string; // Last name of the participant

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the participant',
  })
  email?: string; // Email of the participant

  @IsOptional()
  @IsEnum(ParticipantStatus)
  @ApiProperty({ example: 'active', description: 'Status of the participant' })
  status?: ParticipantStatus; // Status of the participant
}
