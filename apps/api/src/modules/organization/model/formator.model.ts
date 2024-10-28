import { LocalTableInput } from "src/shared/types/db";
import { IsArray, IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { WorkingTime } from "./working-time.model";
import { CreateWorkingTimeDto } from "./group.model";
import { Type } from "class-transformer";

export interface Formator {
	PK: string,
	SK: string,
    uid: string; // Unique identifier for the animator
    name: string; // Animator's full name
    email: string; // Contact information (optional)
	createdAt: number;
	updatedAt?: number;
}

export class CreateFormatorDto {
	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateWorkingTimeDto)
	workingHours!: CreateWorkingTimeDto[];

	@IsNotEmpty()
	@IsString()
	organizationId!: string;
}

export class CreateFormatorItem {
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

export class UpdateFormatorDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	email?: string;
}


export const FormatorSchema: LocalTableInput = {
	TableName: 'Formators',
	AttributeDefinitions: [
		{ AttributeName: 'email', AttributeType: 'S' },
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: 'EmailIndex',
			KeySchema: [
				{ AttributeName: 'email', KeyType: 'HASH' },
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
	],
};
