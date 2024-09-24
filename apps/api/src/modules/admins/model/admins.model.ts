import { LocalTableInput } from "src/shared/types/db";

// Define the schema for the 'Admins' table
export const AdminSchema: LocalTableInput = {
	TableName: 'Admins', // Name of the table
	AttributeDefinitions: [
		{ AttributeName: 'uid', AttributeType: 'S' }, // Define 'uid' attribute of type String
		{ AttributeName: 'organizationId', AttributeType: 'S' }, // Define 'organizationId' attribute of type String
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: "UidIndex",
			KeySchema: [
				{ AttributeName: 'uid', KeyType: 'HASH'}, // Define 'uid' as the hash key for the index
			],
			Projection: {
				ProjectionType: 'ALL', // Include all attributes in the index
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3, // Read capacity units for the index
				WriteCapacityUnits: 3, // Write capacity units for the index
			},
		},
		{
			IndexName: "OrganizationIndex",
			KeySchema: [
				{ AttributeName: 'organizationId', KeyType: 'HASH'}, // Define 'organizationId' as the hash key for the index
			],
			Projection: {
				ProjectionType: 'ALL', // Include all attributes in the index
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3, // Read capacity units for the index
				WriteCapacityUnits: 3, // Write capacity units for the index
			},			
		},
	],
};

/**
 * Table Admins
 * 		- PK: string (Partition Key)
 * 		- SK: string (Sort Key)
 * 		- uid: string () // will be the same as userUid
 * 		- organizationId: string
 * 		- createdAt: number
 * 		- updatedAt: number
 */