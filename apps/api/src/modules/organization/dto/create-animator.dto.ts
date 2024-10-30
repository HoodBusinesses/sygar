import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateWorkingTimeDto } from "../model/group.model";

export class CreateAnimatorDto {
	@IsNotEmpty()
	@IsString()
	firstName!: string;

	@IsNotEmpty()
	@IsString()
	lastName!: string;

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
	firstName!: string;

	@IsNotEmpty()
	@IsString()
	lastName!: string;

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
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateWorkingTimeDto)
	workingHours?: CreateWorkingTimeDto[];
}
