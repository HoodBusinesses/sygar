import { LocalTableInput } from "src/shared/types/db";
import { WorkingTime } from "./group.model";

export interface Animator {
	PK: string,
	SK: string,
    uid: string; // Unique identifier for the animator
    name: string; // Animator's full name
    email: string; // Contact information (optional)
    workingHours: WorkingTime[]; // Array of working times
	createdAt: number;
	updatedAt?: number;
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
