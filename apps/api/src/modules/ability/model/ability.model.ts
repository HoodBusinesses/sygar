import { LocalTableInput } from "src/shared/types/db";

// Define the schema for the 'Abilities' table
export const AbilitySchema: LocalTableInput = {
	TableName: 'Abilities',
	AttributeDefinitions: [
		{ AttributeName: 'identifier', AttributeType: 'S' }, // eg: `{user.email}#READ`
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: "IdentifierIndex", // Add the new index for 'identifier'
			KeySchema: [
				{ AttributeName: 'identifier', KeyType: 'HASH'}, // Define 'identifier' as the hash key for the index
			],
			Projection: {
				ProjectionType: 'ALL', // Include all attributes in the index
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3, // Read capacity units for the index
				WriteCapacityUnits: 3, // Write capacity units for the index
			}
		},
	]
}