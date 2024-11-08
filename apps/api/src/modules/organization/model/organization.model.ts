import { LocalTableInput } from 'src/shared/types/db';

// Define the Organization interface
export interface Organization {
  PK: string;
  SK: string;
  uid: string;
  cnss: string;
  freeTrial: number;
  id: number;
  key: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

// Define the schema for the 'Organizations' table
export const OrganizationSchema: LocalTableInput = {
  TableName: 'Organizations', // Name of the table
  AttributeDefinitions: [
    { AttributeName: 'cnss', AttributeType: 'S' }, // Define 'cnss' attribute of type String'
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'CnssIndex', // Add the new index for 'cnss'
      KeySchema: [
        { AttributeName: 'cnss', KeyType: 'HASH' }, // Define 'cnss' as the hash key for the index
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
