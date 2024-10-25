import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { WorkingTime } from "../model/group.model";
import { Type } from "class-transformer";

export class CreateAnimatorDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => WorkingTime)
	workingHours!: WorkingTime[];
}

export class CreateAnimaotorItemDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;
}

export class UpdateAnimatorDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsArray()
	// @ValidateNested({ each: true })
	workingHours?: WorkingTime[];
}
