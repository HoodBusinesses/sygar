import { LocalTableInput } from "src/shared/types/db";

// Define the schema for the 'Counters' table
export const CounterSchema: LocalTableInput = {
	TableName: 'Counters', // Name of the table
	AttributeDefinitions: [
		{ AttributeName: 'counterName', AttributeType: 'S' }, // Define 'counterName' attribute of type String
	],
    GlobalSecondaryIndexes: [
        {
            IndexName: 'CounterNameIndex',
            KeySchema: [
                { AttributeName: 'counterName', KeyType: 'HASH' },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 3, // Read capacity units for the index
                WriteCapacityUnits: 3, // Write capacity units for the index
            }
        },
    ],
};