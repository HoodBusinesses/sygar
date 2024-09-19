import { Injectable } from '@nestjs/common';
import {
  AttributeValue,
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
  ScanCommandInput,
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
import { ConfigService } from '@nestjs/config';
import { DbConstants } from './db.constants';
import { UserRoles } from 'src/modules/user/model/user.model';
import { CryptService } from '../auth/crypt.service';

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
 * DbService class that provides a configured DynamoDB Document Client instance.
 */
@Injectable()
export class DbService {
  private readonly client: DynamoDBDocumentClient;

  /**
   * Constructor to inject ConfigService and initialize the DynamoDB client.
   *
   * @param config - The ConfigService instance to access environment variables.
   */
  public constructor(
    private readonly config: ConfigService,
    private readonly dbConstants: DbConstants,
    private readonly cryptService: CryptService,
  ) {
    this.client = this.createClient();
  }

  /**
   * Creates and configures a DynamoDB Document Client based on the environment.
   *
   * @returns A configured DynamoDBDocumentClient instance.
   */
  private createClient(): DynamoDBDocumentClient {
    const ENV = this.config.get<string>('NODE_ENV'); // Get the current environment

    const INTERNAL = this.config.get<boolean>('DYNAMODB_INTERNAL'); // GET LOCATION OF DB

    const isLocal = !INTERNAL || ENV === 'test' || ENV === 'dev' || !ENV; // Determine if the environment is local

    let clientConfig: DbConfig;

    if (isLocal) {
      // Local development or testing configuration
      clientConfig = {
        region: this.config.get<string>('DYNAMODB_REGION', 'us-east-1'),
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
            'local',
          ),
          sessionToken: this.config.get<string>(
            'DYNAMODB_SESSION_TOKEN',
            'local',
          ),
        },
      };
    } else {
      // Production configuration
      clientConfig = {
        region: this.config.get<string>('DYNAMODB_REGION', 'eu-west-1'),
      };
    }

    const dynamoClient = new DynamoDBClient(clientConfig);

    // Configuration for marshaling and unmarshaling data
    const marshallOptions = {
      convertEmptyValues: false, // Do not automatically convert empty values to null
      removeUndefinedValues: true, // Remove undefined values while marshalling
      convertClassInstanceToMap: true, // Convert class instances to map attributes
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
   * Provides access to the DynamoDB Document Client instance.
   *
   * @returns The DynamoDBDocumentClient instance.
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
   * Deletes a single item from a DynamoDB table.
   *
   * @param params - The parameters for the DeleteCommand.
   */
  public async deleteItem(params: DeleteCommandInput): Promise<void> {
    await this.client.send(new DeleteCommand(params));
  }

  /**
   * Gets a single item from a DynamoDB table.
   *
   * @param params - The parameters for the GetCommand.
   * @returns The retrieved item.
   */
  public async getItem(params: GetCommandInput): Promise<any> {
    const result = await this.client.send(new GetCommand(params));
    return result.Item;
  }

  /**
   * Scans items from a DynamoDB table.
   *
   * @param params - The parameters for the ScanCommand.
   * @returns The scanned items.
   */
  public async scanItems(params: ScanCommandInput): Promise<any[]> {
    const result = await this.client.send(new ScanCommand(params));
    return result.Items ?? [];
  }
  /**
   * Updates a single item in a DynamoDB table.
   *
   * @param params - The parameters for the UpdateCommand.
   * @returns The updated item.
   */
  public async updateItem(params: UpdateCommandInput): Promise<any> {
    const result = await this.client.send(new UpdateCommand(params));
    return result.Attributes;
  }

  /**
   * Batch writes (put or delete) multiple items in a DynamoDB table.
   *
   * @param params - The parameters for the BatchWriteCommand.
   */
  public async batchWriteItems(params: BatchWriteCommandInput): Promise<void> {
    await this.client.send(new BatchWriteCommand(params));
  }


  /**
   * Method to query items from a DynamoDB table.
   * @param params - The parameters for the QueryCommand.
   * @returns The queried items.
   */
  public async query(params: any): Promise<any> {
    const result = await this.client.send(new QueryCommand(params));
    return result.Items ?? [];
  }


  /**
   * Seed the sugar admin user if it does not exist.
   */
  async seedAdmin() {
    // params for scanning the users table for the admin user
    const scanRoleParams: ScanCommandInput = {
      TableName: this.dbConstants.getTable('Users'),
      FilterExpression: '#role = :userRole',
      ExpressionAttributeNames: {
      '#role': 'role',
      },
      ExpressionAttributeValues: {
      ':userRole': { S: UserRoles.SYGAR_ADMIN },
      },
    };


    try {
      // Scan the users table for the admin user
      const Items = await this.scanItems(scanRoleParams);
      // If the admin already exists, return
      if (Items.length > 0)
        return;

      // Create the admin user
      const admin = {
        uid: '1',
        PK: this.dbConstants.getPrimaryKey('Users'),
        SK: this.dbConstants.getSortKey('1'),
        cnss: '1',
        nationalIdentifier: '1',
        nationalIdentifierType: '1',
        firstName: 'Admin',
        lastName: 'Admin',
        email: this.config.get<string>('SUPERADMIN_EMAIL', 'sygaradmin@hood.com'),
        password: await this.cryptService.hash(
          this.config.get<string>('SUPERADMIN_PASSWORD', 'password'),
        ),
        role: UserRoles.SYGAR_ADMIN,
        phone: '1',
      };

      // params for putting the admin user in the database
      const putParams: PutCommandInput = {
        TableName: this.dbConstants.getTable('Users'),
        Item: admin,
      };

      // Put the admin user in the database
      await this.putItem(putParams);
    } catch (error: any) {
      // Log any errors
      console.error(`Error seeding admin: ${error.message}`);
    }
  }

  /**
   * Method to map a DynamoDB item to an object
   * @param item - The DynamoDB item
   * @returns The object
   */
    mapDynamoDBItemToObject(item: Record<string, AttributeValue>): any {
      const obj: any = {};
      for (const key in item) {
        if (item[key] && item[key].S)
          obj[key] = item[key].S;
        else if (item[key] && item[key].N)
          obj[key] = parseInt(item[key].N);
        else if (item[key] && item[key].BOOL)
          obj[key] = item[key].BOOL;
  
      }
      return obj;
    }
  
    /**
     * Method to map an object to a DynamoDB item
     * @param obj - The object
     * @returns The DynamoDB item
     */
    mapObjectToDynamoDBItem(obj: any): Record<string, AttributeValue> {
      const item: Record<string, AttributeValue> = {};
      for (const key in obj) {
        if (typeof obj[key] === 'number')
          item[key] = { N: String(obj[key]) };
        else if (typeof obj[key] === 'string')
          item[key] = { S: obj[key] };
        else if (typeof obj[key] === 'boolean')
          item[key] = { BOOL: obj[key] };
      }
      return item;
    }

}
