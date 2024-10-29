import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateWorkingTimeDto } from "../model/group.model";

export class CreateAnimatorDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateWorkingTimeDto)
	workingHours!: CreateWorkingTimeDto[];

	@IsNotEmpty()
	@IsString()
	organizationId!: string;
}

export class CreateAnimatorItemDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	organizationId!: string;
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
	@ValidateNested({ each: true })
	@Type(() => CreateWorkingTimeDto)
	workingHours?: CreateWorkingTimeDto[];
}
