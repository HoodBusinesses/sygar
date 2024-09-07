import { CreateTableCommand, CreateTableCommandInput, DeleteTableCommand, GetItemCommand, PutItemCommand, AttributeDefinition } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import docClient from "./dynamo.config";

describe('DynamoDB Client', () => {
	test('should configure client for local environment', () => {
		process.env.NODE_ENV = 'STAGE';
		const client = docClient;

		expect(client).toBeDefined();
	});

	test('should create a table and perform CRUD operations', async () => {
		const tableName = 'TestTable';
		const region = 'us-west-2'; // Replace with your desired region

		const shema: CreateTableCommandInput =  {
			TableName: tableName,
			KeySchema: [{ AttributeName: 'id', KeyType: 'HASH'}],
			AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' } as AttributeDefinition],
			ProvisionedThroughput: { ReadCapacityUnits: 3, WriteCapacityUnits: 3},
		};

		const client = new DynamoDBClient({ region,
			endpoint: 'http://localhost:8000',
			credentials: {
				accessKeyId: 'local',
				secretAccessKey: 'local',
				sessionToken: 'local',
			},
		 }); // Create DynamoDB client with region

		try {
			await client.send(new DeleteTableCommand({ TableName: tableName }));
		}
		catch (error) {
			
		}
		await client.send(new CreateTableCommand(shema));

		const params1 = {
			TableName: tableName,
			Item: { id: { S: '123' }, username: { S: 'test' } },
		};
		await client.send(new PutItemCommand(params1));

		const params2 = {
			TableName: tableName,
			Key: { id: { S: '123' } },
		};

		const result = await client.send(new GetItemCommand(params2));
		

		expect(result.Item).toEqual({ id: { S: '123' }, username: { S: 'test' } });

		await client.send(new DeleteTableCommand({ TableName: tableName }));
	})
})
