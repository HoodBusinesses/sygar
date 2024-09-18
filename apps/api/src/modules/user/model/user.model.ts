import { LocalTableInput } from "src/shared/types/db";

// Define the schema for the 'Users' table
export const UserSchema: LocalTableInput = {
	TableName: 'Users', // Name of the table
	AttributeDefinitions: [
		{ AttributeName: 'email', AttributeType: 'S' }, // Define 'email' attribute of type String
		{ AttributeName: 'cnss', AttributeType: 'S' }, // Define 'cnss' attribute of type String'
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: "EmailIndex",
			KeySchema: [
				{ AttributeName: 'email', KeyType: 'HASH'}, // Define 'email' as the hash key for the index
			],
			Projection: {
				ProjectionType: 'ALL', // Include all attributes in the index
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3, // Read capacity units for the index
				WriteCapacityUnits: 3, // Write capacity units for the index
			}
		},
		{
			IndexName: "CnssIndex", // Add the new index for 'cnss'
			KeySchema: [
				{ AttributeName: 'cnss', KeyType: 'HASH'}, // Define 'cnss' as the hash key for the index
			],
			Projection: {
				ProjectionType: 'ALL', // Include all attributes in the index
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3, // Read capacity units for the index
				WriteCapacityUnits: 3, // Write capacity units for the index
			}
		}
	],
}
