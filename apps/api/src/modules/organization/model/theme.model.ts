import { LocalTableInput } from 'src/shared/types/db';

// Define the Theme interface
export interface Theme {
  PK: string; // Primary Key
  SK: string; // Sort Key
  uid: string; // Unique identifier for the theme
  name: string; // Name of the theme (e.g., "Advanced Leadership Training")
  cost: number; // Cost of the theme
  description?: string; // Optional description for the group
  organizationId: string; // ID of the organization creating the theme
  startDate: number; // Start date for the theme (timestamp)
  endDate: number; // End date for the theme (timestamp)
  createdAt: number; // Timestamp for theme creation
  updatedAt?: number; // Optional timestamp for the last update
}

// Define the schema for the 'Themes' table
export const ThemeSchema: LocalTableInput = {
  TableName: 'Themes', // Name of the table
  AttributeDefinitions: [
    { AttributeName: 'uid', AttributeType: 'S' }, // Define 'uid' attribute of type String'
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'uidIndex', // Add the new index for 'uid'
      KeySchema: [
        { AttributeName: 'uid', KeyType: 'HASH' }, // Define 'uid' as the hash key for the index
      ],
      Projection: {
        ProjectionType: 'ALL', // Include all attributes in the index
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 3, // Read capacity units for the index
        WriteCapacityUnits: 3, // Write capacity units for the index
      },
    },
  ],
};
