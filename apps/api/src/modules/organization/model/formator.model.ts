import { LocalTableInput } from "src/shared/types/db";

/**
 * Interface for a formator
 */
export interface Formator {
	PK: string,
	SK: string,
	uid: string; // Unique identifier for the animator
	firstName: string; // First name of the animator
	lastName: string; // Last name of the animator
	email: string; // Contact information (optional)
	organizationId: string; // Organization ID of the formator
	createdAt: number; // Creation date of the formator
	updatedAt?: number; // Update date of the formator
}

/**
 * Schema for the formator table
 */
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
