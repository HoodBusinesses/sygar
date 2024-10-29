import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbService } from '../global/db/db.service';
import { DbConstants } from '../global/db/db.constants';
import { CryptService } from 'src/global/auth/crypt.service';
import { UserRoles } from '../modules/user/model/user.model';
import { ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { LocalTableInput } from '../shared/types/db';
import { CreateTableCommand, CreateTableCommandInput } from '@aws-sdk/client-dynamodb';

/**
 * Service responsible for database initialization and seeding operations.
 * Provides functionality to create DynamoDB tables and seed initial user data.
 */
@Injectable()
export class ScriptsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly dbService: DbService,
    private readonly dbConstants: DbConstants,
    private readonly cryptService: CryptService,
  ) {}

  /**
   * Seeds a user into the database with specified role and credentials.
   * Checks for existing users with the same role before creating new ones.
   * 
   * @param role - The role to assign to the user (e.g., SYGAR_ADMIN, SYGAR_USER)
   * @param uid - Unique identifier for the user
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @param emailKey - Environment variable key for the user's email
   * @param passwordKey - Environment variable key for the user's password
   */
  async seedUser(
    role: UserRoles,
    uid: string,
    firstName: string,
    lastName: string,
    emailKey: string,
    passwordKey: string,
  ) {
    // Prepare scan parameters to check for existing users with the same role
    const scanRoleParams: ScanCommandInput = {
      TableName: this.dbConstants.getTable('Users'),
      FilterExpression: '#role = :userRole',
      ExpressionAttributeNames: {
        '#role': 'role',
      },
      ExpressionAttributeValues: {
        ':userRole': { S: role },
      },
    };

    try {
      // Check if user with this role already exists
      const Items = await this.dbService.scanItems(scanRoleParams);
      if (Items.length > 0) {
        console.log(`${role} already seeded`);
        return;
      }

      // Create new user object with provided details
      const user = {
        uid,
        PK: this.dbConstants.getPrimaryKey('Users'),
        SK: this.dbConstants.getSortKey(uid),
        firstName,
        lastName,
        email: this.configService.get<string>(emailKey, `${role.toLowerCase()}@hood.com`),
        password: await this.cryptService.hash(
          this.configService.get<string>(passwordKey, 'password'),
        ),
        role,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // Save user to database
      const putParams: PutCommandInput = {
        TableName: this.dbConstants.getTable('Users'),
        Item: user,
      };
      await this.dbService.putItem(putParams);
      console.log(`Seeded ${role} successfully`);
    } catch (error) {
      console.error(`Error seeding ${role}:`, (error as Error).message);
    }
  }

  /**
   * Creates a new DynamoDB table with the specified schema.
   * Sets up primary key (PK) and sort key (SK) with additional attributes if provided.
   * 
   * @param table - Table configuration including name and attribute definitions
   */
  async createTable(table: LocalTableInput) {
    // Prepare the table schema with standard configuration
    const schema: CreateTableCommandInput = {
      ...table,
      TableName: this.dbConstants.getTable(table.TableName!),
      // Set up composite key (PK + SK)
      KeySchema: [
        { AttributeName: 'PK', KeyType: 'HASH' },
        { AttributeName: 'SK', KeyType: 'RANGE' },
      ],
      // Define attribute types
      AttributeDefinitions: [
        { AttributeName: 'PK', AttributeType: 'S' },
        { AttributeName: 'SK', AttributeType: 'S' },
        ...(table.AttributeDefinitions ? table.AttributeDefinitions : []),
      ],
      // Set default capacity units
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
      },
    };

    try {
      await this.dbService.getClient().send(new CreateTableCommand(schema));
      console.log(`Table ${schema.TableName} created successfully.`);
    } catch (error) {
      console.error(
        `Error creating table ${schema.TableName}: ${(error as any).message}`,
      );
    }
  }
} 