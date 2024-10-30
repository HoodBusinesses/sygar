import { LocalTableInput } from "src/shared/types/db";
import { IsOptional, IsString } from "class-validator";

export interface Animator {
	PK: string,
	SK: string,
    uid: string; // Unique identifier for the animator
    firstName: string;
    lastName: string;
    email: string; // Contact information (optional)
	createdAt: number;
	updatedAt?: number;
}

export class UpdateAnimatorDto {
	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsOptional()
	@IsString()
	email?: string;
}

export const AnimatorSchema: LocalTableInput = {
	TableName: 'Animators',
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
