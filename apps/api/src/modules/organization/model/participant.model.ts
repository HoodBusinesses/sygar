import { LocalTableInput } from "src/shared/types/db";

/**
 * Enum for the participant status
 */
export enum ParticipantStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

/**
 * Interface for a participant
 */
export interface Participant {
	PK: string;
	SK: string;
    uid: string; // Unique identifier for the participant (e.g., CNSS or another ID)
    firstName: string; // First name of the participant
    lastName: string; // Last name of the participant
    email: string; // Contact information for notifications
	cnss: string; // Unique identifier for the participant (e.g., CNSS or another ID)
    status: ParticipantStatus; // e.g., 'active', 'inactive', or other statuses as needed
	organizationId: string; // The Uid of the organization the participant belongs to
	createdAt: number;
	updatedAt?: number;
}

/**
 * Schema for the participant table
 */
export const ParticipantSchema: LocalTableInput = {
	TableName: 'Participants',
	AttributeDefinitions: [
		{ AttributeName: 'uid', AttributeType: 'S' },
		{ AttributeName: 'cnss', AttributeType: 'S' },
		{ AttributeName: 'email', AttributeType: 'S' },
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: 'UidIndex',
			KeySchema: [
				{ AttributeName: 'uid', KeyType: 'HASH' },
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
		{
			IndexName: 'CnssIndex',
			KeySchema: [
				{ AttributeName: 'cnss', KeyType: 'HASH' },
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
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