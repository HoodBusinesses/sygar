import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnrolledType } from '../model/group.model';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for assigning a member to a group
 */
export class AssignToGroupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123456789', description: 'UID of the participant' })
  enrolledUid!: string; // the uid of the enrolled

  @IsNotEmpty()
  @IsEnum(EnrolledType)
  @ApiProperty({ example: 'Participant', description: 'Type of the enrolled' })
  enrolledType!: EnrolledType; // the type of the enrolled eg: Participant, Animator, Formator

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123456789', description: 'UID of the group' })
  groupUid!: string; // the uid of the group
}
