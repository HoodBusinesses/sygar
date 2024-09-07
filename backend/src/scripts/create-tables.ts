import { CreateTableCommand, CreateTableInput, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import docClient from "../global/db/dynamo.config";
import { DatabaseConstants } from "../global/db/db.constants";

// Function to create a table in DynamoDB
export const CreateTable = async (tableName: string) => {
	const constants = new DatabaseConstants();
	const schema: CreateTableInput = {
		TableName: tableName,
		KeySchema: [
			{ AttributeName: 'uid', KeyType: 'HASH' }, // Primary key attribute
			{ AttributeName: 'createdAt', KeyType: 'RANGE' }, // Sort key attribute
		],
		AttributeDefinitions: [
			{ AttributeName: 'uid', AttributeType: 'S' }, // Attribute definition for 'uid'
			{ AttributeName: 'createdAt', AttributeType: 'S' }, // Attribute definition for 'createdAt'
		],
		ProvisionedThroughput: {
			ReadCapacityUnits: 3, // Read capacity units for the table
			WriteCapacityUnits: 3, // Write capacity units for the table
		},
	};

	try {
		const data = await docClient.send(new CreateTableCommand(schema)); // Send the CreateTableCommand to DynamoDB
		console.log(`Table ${tableName} created successfully.`);
	} catch (error) {
		console.error(`${error.message}: ${schema.TableName}`);
	}
}

// Function to check the list of tables in DynamoDB
async function checkTables() {
	try {
		const { TableNames } = await docClient.send(new ListTablesCommand({})); // Send the ListTablesCommand to DynamoDB
		console.log("Tables:", TableNames);
	} catch (error) {
		console.error("Error listing tables:", error);
	}
}

// Main function to create tables and check the list of tables
async function main() {
	const tables = ['Users', 'Abilities', 'Organizations', 'Admins', 'Bills']; // List of table names to create

	for (const table of tables) {
		console.log('Creating table ' + table);
		await CreateTable(table); // Create each table
	}
	checkTables(); // Check the list of tables
}

main(); 
