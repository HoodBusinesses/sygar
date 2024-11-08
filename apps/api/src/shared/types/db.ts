import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';

/**
 * Represents the input for a local table in a database.
 * This type is a partial object that includes specific properties from the `CreateTableCommandInput` type.
 * The properties included are:
 * - `LocalSecondaryIndexes`: The local secondary indexes for the table.
 * - `GlobalSecondaryIndexes`: The global secondary indexes for the table.
 * - `AttributeDefinitions`: The attribute definitions for the table.
 * - `TableName`: The name of the table.
 */
export type LocalTableInput = Partial<
  Pick<
    CreateTableCommandInput,
    | 'LocalSecondaryIndexes'
    | 'GlobalSecondaryIndexes'
    | 'AttributeDefinitions'
    | 'TableName'
  >
>;
