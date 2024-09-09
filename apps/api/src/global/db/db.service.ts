import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
	DescribeTableCommand, 
  DescribeTableCommandInput, 
  CreateTableCommand, 
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand,
  BatchWriteCommandInput,
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  TranslateConfig,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { ResourceNotFoundException } from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';
import { DatabaseConstants } from './db.constants';
/**
 * Type definition for the DynamoDB configuration.
 */
type DbConfig = {
	region: string;
	endpoint?: string;
	credentials?: {
		accessKeyId: string;
		secretAccessKey: string;
		sessionToken?: string;
	};
};

/**
 * DbSerice class that provides a configured DynamoDB Document Client instence.
 */
@Injectable()
export class DbService {
	private readonly client: DynamoDBDocumentClient;

	/**
	 * Constructor to injec ConfigService and initialize the DynamoDB client.
	 *
	 * @param config - The ConfigService instance to access environement variables.
	 */
	public constructor(private readonly config: ConfigService,
			   private readonly databaseConstants: DatabaseConstants) {
		this.client = this.createClient();
	}

	/**
	 * Creates and configures a DynamoDB Document Client based on the envirenment.
	 *
	 * @return A configured DynamoDBDocumentClient instence.
	 */
	private createClient(): DynamoDBDocumentClient {
		const ENV = this.config.get<string>('NODE_ENV'); // Get the current environment.
		const isLocal = ENV === 'Staging' || !ENV; // Determine if the environment is Local

		let clientConfig: DbConfig;

		if (isLocal) {
			// Local development configuration
			clientConfig = {
				region: this.config.get<string>('DYNAMODB_REGION', 'us-west-2'),
				endpoint: this.config.get<string>(
					'DYNAMODB_ENDPOINT',
					'http://localhost:8000',
				),
				credentials: {
					accessKeyId: this.config.get<string>(
						'DYNAMODB_ACCESS_KEY_ID',
						'local',
					),
					secretAccessKey: this.config.get<string>(
						'DYNAMODB_SECRET_ACCESS_KEY',
						'local'
					),
					sessionToken: this.config.get<string>(
						'DYNAMODB_SESSION_TOKEN',
						'local'
					),
				},
			};
		} else {
			// Production Configutation
			clientConfig = { 
				region: this.config.get<string>('DYNAMODB_REGION', 'eu-west-1'),
			};
		}

		const dynamoClient = new DynamoDBClient(clientConfig);

		// Config for marshalling and unmarshalling data
		const marshallOptions = {
			convertEmptyValues: false, // Do not automatically convert empty values to null
			removeUnderfinedValue: true, // Remove undefined values while marshalling
			convertClassInstanceToMap: true, // Convert class instence to map attributes
		};

		const unmarshallOptions = {
			wrapNumbers: false, // Do not wrap numbers as strings
		};

		const translateConfig: TranslateConfig = {
			marshallOptions,
			unmarshallOptions,
		};

		// Return the configured DynamoDBDocumentClient
		return DynamoDBDocumentClient.from(dynamoClient, translateConfig);
	}


	/**
	 * Provides access to the DynamoDB Document Client instanec.
	 *
	 * @return The DynamoDBDocument instance.
	 */
	public getClient(): DynamoDBDocumentClient {
		return this.client;
	}

	/**
	 * Puts a single item into a DynamoDB table.
	 *
	 * @param params - The parameters for the PutCommand.
	 */
	public async putItem(params: PutCommandInput): Promise<void> {
		await this.client.send(new PutCommand(params));
	}

	/**
	 * Deletes a simple item from a DynamoDB table.
	 *
	 * @param params - The parameters for the GetCommand
	 */
	public async deleteItem(params: DeleteCommandInput): Promise<void> {
		await this.client.send(new DeleteCommand(params));
	}

	/**
	 * Get single item form a DynamoDB table.
	 *
	 * @param params - The parameters for the GetCommand.
	 * @return The retrieved item.
	 */
	public async getItem(params: GetCommandInput): Promise<any> {
		return await this.client.send(new GetCommand(params));
	}

	/**
	 * Scans items from a DynamoDB tables.
	 *
	 * @param params - The parameters for the ScanCommand.
	 * @return The scanned items.
	 */
	public async scanItem(params: ScanCommandInput): Promise<any[]> {
		const result = await this.client.send(new ScanCommand(params));
		return result.Items ?? [];
	}

	/**
	 * Update a single item from a DynamoDB tables.
	 *
	 * @param params - The parameters for the UpdateCommand
	 * @return The updated item.
	 */
	public async updateItem(params: UpdateCommandInput): Promise<any> {
		const result = await this.client.send(new UpdateCommand(params));
		return result.Attributes;
	}

	/**
	 * Batch writes (put or delete) multiple items in DynamoDB table.
	 *
	 * @param params - The parameters for the BatchWriteCommand.
	 */
	public async batchWriteItems(params: BatchWriteCommandInput): Promise<void> {
		await this.client.send(new BatchWriteCommand(params));
	}

	/**
	 * Creates a DynamoDB table.
	 *
	 * @param tableName - The base name of the table to create.
	 */
	public async createTable(tableName: string) {
		const schema: CreateTableCommandInput = {
			TableName: this.databaseConstants.getTable(tableName),
			KeySchema: [
				{ AttributeName: 'uid', KeyType: 'HASH' },
				{ AttributeName: 'createdAt', KeyType: 'RANGE' },
			],
			AttributeDefinitions: [
				{ AttributeName: 'uid', AttributeType: 'S' },
				{ AttributeName: 'createdAt', AttributeType: 'S' },
			],
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		};

		try {
			await this.client.send(new CreateTableCommand(schema));
			console.log(`Table ${schema.TableName} created successfully.`);
		} catch (error) {
			if (error instanceof Error)
				console.error(
					`Error creating table ${schema.TableName}: ${error.message}`
				);
		}
	}

	/**
	 * Check if a table exists in a DynmaoDB database
	 *
	 * @param tableName - The table name that we want to check
	 */
	public async checkTableExists(tableName: string): Promise<boolean> {
		try {
			const params: DescribeTableCommandInput = {
				TableName: this.databaseConstants.getTable(tableName),
			};
			await this.client.send(new DescribeTableCommand(params));
			return true;
		} catch (error) {
			if (error instanceof ResourceNotFoundException)
				return false;
			throw error;
		}
	}
}
