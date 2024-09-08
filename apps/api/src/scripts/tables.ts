import {
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';
import { DbConstants } from 'src/global/db/db.constants';
import { DbService } from 'src/global/db/db.service';
import { inspect } from 'util';

const configService = new ConfigService();
const dbConstants = new DbConstants(configService);
const dbService = new DbService(configService);
/**
 * Creates a DynamoDB table.
 *
 * @param tableName - The base name of the table to create.
 */
export const createTables = async (tableName: string) => {
  const schema: CreateTableCommandInput = {
    TableName: dbConstants.getTable(tableName),
    KeySchema: [
      { AttributeName: 'PK', KeyType: 'HASH' },
      { AttributeName: 'SK', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'PK', AttributeType: 'S' },
      { AttributeName: 'SK', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 3,
      WriteCapacityUnits: 3,
    },
  };

  try {
    await dbService.getClient().send(new CreateTableCommand(schema));
    console.log(`Table ${schema.TableName} created successfully.`);
  } catch (error) {
    if (error instanceof Error)
      console.error(
        `Error creating table ${schema.TableName}: ${error.message}`,
      );
  }
};

/**
 * Main function to create tables.
 */
async function main() {
  const tables = ['User'];

  for (const table of tables) {
    console.log('Creating table ' + table);
    await createTables(table);
  }
}

main(); // This is the main function that will run the script
