import { IsDateString, IsOptional, IsString } from "class-validator";

export class UpdateGroupDateDto {

	@IsOptional()
	@IsDateString()
	startDate?: Date;


	@IsOptional()
	@IsDateString()
	endDate?: Date;

}
