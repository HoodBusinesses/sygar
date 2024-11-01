import { IsEnum, IsOptional, IsString } from "class-validator";
import { GroupAction } from "../model/group.model";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for updating a group
 */
export class UpdateGroupDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Location', description: 'Location of the group' })
	location?: string; // Location of the group

	@IsOptional()
	@IsEnum(GroupAction)
	@ApiProperty({ example: 'Planned', description: 'Action of the group' })
	action?: GroupAction; // Action of the group
}
