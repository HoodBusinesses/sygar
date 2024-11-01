import { LocalTableInput } from "src/shared/types/db";
import { EnrolledType } from "./group.model";

/**
 * Interface for an assigning group
 */
export class AssigningGroup {
	PK!: string;
	SK!: string;
	uid!: string;
	enrolledUid!: string; // Unique identifier for the enrolled member
	enrolledType!: EnrolledType; // Type of the enrolled member
	groupUid!: string; // Unique identifier for the group
	themeId!: string; // Unique identifier for the theme
	organizationId!: string; // Unique identifier for the organization
	startDate!: number; // Start date of the assigning group
	endDate!: number; // End date of the assigning group
	createdAt!: number;
	updatedAt?: number;
}

/**
 * Schema for the assigning group table
 */
export const AssigningGroupSchema: LocalTableInput = {
	TableName: 'AssigningGroups',
	AttributeDefinitions: [
		{ AttributeName: 'uid', AttributeType: 'S' },
		{ AttributeName: 'enrolledUid', AttributeType: 'S' },
		{ AttributeName: 'enrolledType', AttributeType: 'S' }
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
			IndexName: 'EnrolledIndex',
			KeySchema: [
				{ AttributeName: 'enrolledUid', KeyType: 'HASH' },
				{ AttributeName: 'enrolledType', KeyType: 'RANGE' }
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		}
	]
}
