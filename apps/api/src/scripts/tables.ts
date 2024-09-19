import {
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';
import { DbConstants } from '../global/db/db.constants';
import { DbService } from '../global/db/db.service';
import { UserSchema } from '../modules/user/model/user.model';
import { LocalTableInput } from '../shared/types/db';
import { AbilitySchema } from 'src/modules/ability/model/ability.model';
import { AdminSchema } from 'src/modules/admin/model/admin.model';
import { OrganizationSchema } from 'src/modules/organization/model/organization.model';
import { BillSchema } from 'src/modules/bill/model/bill.model';

const configService = new ConfigService();
const dbConstants = new DbConstants(configService);
const dbService = new DbService(configService, dbConstants, undefined as any);
/**
 * Creates a DynamoDB table.
 *
 * @param tableName - The base name of the table to create.
 */
export const createTables = async (table: LocalTableInput) => {
  const schema: CreateTableCommandInput = {
    ...table,
    TableName: dbConstants.getTable(table.TableName!),
    KeySchema: [
      { AttributeName: 'PK', KeyType: 'HASH' },
      { AttributeName: 'SK', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'PK', AttributeType: 'S' },
      { AttributeName: 'SK', AttributeType: 'S' },
      ...(table.AttributeDefinitions ? table.AttributeDefinitions : []),
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
  const tables = [
    UserSchema,
    AbilitySchema,
    OrganizationSchema,
    AdminSchema,
    BillSchema
  ];

  for (const table of tables) {
    console.log('Creating table ' + table);
    await createTables(table);
  }
}

main(); // This is the main function that will run the script
