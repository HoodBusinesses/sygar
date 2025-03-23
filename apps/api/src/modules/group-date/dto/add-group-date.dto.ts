
import { IsArray, IsDateString, IsString, ArrayMinSize } from 'class-validator';

export class AddGroupDateDto {

	@IsArray()
	@ArrayMinSize(1)
	startDates!: string[];

	@IsArray()
	@ArrayMinSize(1)
	endDates!: string[];

	@IsString()
	groupId!: string;
}

