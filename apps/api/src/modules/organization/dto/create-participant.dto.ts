import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ParticipantStatus } from "../model/participant.model";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for creating a new participant
 */
export class CreateParticipantDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'John', description: 'First name of the participant' })
	firstName!: string; // First name of the participant

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: 'Doe', description: 'Last name of the participant' })
	lastName!: string; // Last name of the participant

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ example: 'john.doe@example.com', description: 'Email of the participant' })
	email!: string; // Email of the participant

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: '123456789', description: 'CNSS of the participant' })
	cnss!: string; // CNSS of the participant

	@IsNotEmpty()
	@IsEnum(ParticipantStatus)
	@ApiProperty({ example: 'active', description: 'Status of the participant' })
	status!: ParticipantStatus; // Status of the participant eg: active, inactive

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ example: '123456789', description: 'Organization ID of the participant' })
	organizationId!: string; // Organization ID of the participant the participant belongs to
}
