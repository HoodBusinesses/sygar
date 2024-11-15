import { CreateTableCommand, CreateTableCommandInput, DynamoDBClient, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { UserRoles, UserSchema } from '../modules/user/model/user.model';
import { AbilitySchema } from '../modules/ability/model/ability.model';
import { AdminSchema } from '../modules/admins/model/admins.model';
import { OrganizationSchema } from '../modules/organization/model/organization.model';
import { BillSchema } from '../modules/bill/model/bill.model';
import { CounterSchema } from '../modules/counter/model/counter.model';
import { NotificationSchema } from '../global/notifactions/model/notifactions.model';
import { ThemeSchema } from '../modules/organization/model/theme.model';
import { GroupSchema } from '../modules/organization/model/group.model';
import { AnimatorSchema } from 'src/modules/organization/model/animator.model';
import { FormatorSchema } from 'src/modules/organization/model/formator.model';
import { ParticipantSchema } from 'src/modules/organization/model/participant.model';
import { AssigningGroupSchema } from 'src/modules/organization/model/assigning-group.model';
import * as crypto from 'bcryptjs'
import { config } from "dotenv";
import { join } from "path";

config({ path: join(process.cwd(), '.env') })

console.log({ path: process.cwd() })


function createClient(): DynamoDBDocumentClient {
  const ENV = process.env.NODE_ENV


  const isLocal = ENV === 'test' || ENV === 'development' || !ENV; // Determine if the environment is local

  // Local development or testing configuration
  const region = process.env.SYGAR_DYNAMODB_REGION || 'us-east-2';
  const endpoint = process.env.AWS_DYNAMODB_ENDPOINT || 'https://dynamodb.us-east-2.amazonaws.com'

  const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
    ...(isLocal ? { sessionToken: process.env.DYNAMODB_SESSION_TOKEN || 'local' } : {}),
  }


  const dynamoClient = new DynamoDBClient({ region, endpoint, credentials });
  console.log({ region, endpoint, credentials })

  // Configuration for marshaling and unmarshaling data
  const marshallOptions = {
    convertEmptyValues: false, // Do not automatically convert empty values to null
    removeUndefinedValues: true, // Remove undefined values while marshalling
    convertClassInstanceToMap: true, // Convert class instances to map attributes
  };

  const unmarshallOptions = {
    wrapNumbers: false, // Do not wrap numbers as strings
  };

  const translateConfig = {
    marshallOptions,
    unmarshallOptions,
  };
  // Return the configured DynamoDBDocumentClient
  return DynamoDBDocumentClient.from(dynamoClient, translateConfig);
};

// Fetch the project name from environment variables or use a default value
const projectName = process.env.SYGAR_PROJECT_NAME || 'SYGAR';

// Determine if the environment is production based on NODE_ENV
const isProduction = process.env.NODE_ENV === 'production';

// Set the table suffix based on the environment
const tableSuffix = isProduction ? 'Prod' : 'Staging';

/**
   * Constructs the DynamoDB table name using the project name and environment suffix.
   *
   * @param name - The base name of the table.
   * @returns The constructed table name.
   */
function getTable(name: string): string {
  return `${projectName}_${name}_${tableSuffix}`;
}

/**
 * Constructs the primary key name for a given base name.
 *
 * @param name - The base name for the primary key.
 * @returns The constructed primary key name.
 */
function getPrimaryKey(name: string): string {
  return `${name.toUpperCase()}_${tableSuffix.toUpperCase()}`;
}

/**
 * Constructs the sort key name for a given base name.
 *
 * @param name - The base name for the sort key.
 * @returns The constructed sort key name.
 */
function getSortKey(name: string): string {
  return `${name.toUpperCase()}_${tableSuffix.toUpperCase()}_SECRET`;
}


const client = createClient();

async function createTable(table: any) {
  // Prepare the table schema with standard configuration
  const schema: CreateTableCommandInput = {
    ...table,
    TableName: getTable(table.TableName!),
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
    await client.send(new CreateTableCommand(schema));
    console.log(`Table ${schema.TableName} created successfully.`);
  } catch (error) {
    console.error(
      `Error creating table ${schema.TableName}: ${(error as any).message}`
    );
  }
}

async function seedUser(
  role: UserRoles,
  uid: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  // Prepare scan parameters to check for existing users with the same role
  const scanRoleParams: ScanCommandInput = {
    TableName: getTable('Users'),
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
    const Items = (await client.send(new ScanCommand(scanRoleParams))).Items;
    if (Items!.length > 0) {
      console.log(`${role} already seeded`);
      return;
    }

    // Create new user object with provided details
    const user = {
      uid,
      PK: getPrimaryKey('Users'),
      SK: getSortKey(uid),
      firstName,
      lastName,
      email: email,
      password: await crypto.hash(password, 12),
      role,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Save user to database
    const putParams: PutCommandInput = {
      TableName: getTable('Users'),
      Item: user,
    };
    await client.send(new PutCommand(putParams));
    console.log(`Seeded ${role} successfully`);
  } catch (error) {
    console.error(`Error seeding ${role}:`, (error as Error).message);
  }
}

const seedUsers = async () => {
  try {
    // Seed SYGAR Admin user
    await seedUser(
      UserRoles.SYGAR_ADMIN,
      '1',
      'Sygar',
      'Admin',
      process.env.SYGAR_ADMIN_EMAIL || 'admin@hood.com',
      process.env.SYGAR_ADMIN_PASSWORD || 'admin'
    );

    // Seed SYGAR regular user
    await seedUser(
      UserRoles.SYGAR_USER,
      '2',
      'Sygar',
      'User',
      process.env.SYGAR_USER_EMAIL || 'user@hood.com',
      process.env.SYGAR_USER_PASSWORD || 'user'
    );
  } catch (error) {
    console.error('Error seeding admins:', (error as Error).message);
  }
}



const createTables = async () => {
  const tables = [
    UserSchema,
    AbilitySchema,
    OrganizationSchema,
    AdminSchema,
    BillSchema,
    CounterSchema,
    NotificationSchema,
    ThemeSchema,
    GroupSchema,
    AnimatorSchema,
    FormatorSchema,
    ParticipantSchema,
    AssigningGroupSchema,
  ];

  try {
    // Create each table sequentially
    for (const table of tables) {
      console.log('Creating table ' + table.TableName);
      await createTable(table);
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables().then(() => { seedUsers().then(() => { console.log('init script done') }) })
