import { LocalTableInput } from 'src/shared/types/db';

/**
 * Interface for an animator
 */
export interface Animator {
  PK: string;
  SK: string;
  uid: string; // Unique identifier for the animator
  firstName: string; // First name of the animator
  lastName: string; // Last name of the animator
  email: string; // Email of the animator
  organizationId: string; // Organization ID of the animator
  createdAt: number; // Creation date of the animator
  updatedAt?: number; // Update date of the animator
}

/**
 * Schema for the animator table
 */
export const AnimatorSchema: LocalTableInput = {
  TableName: 'Animators',
  AttributeDefinitions: [
    { AttributeName: 'uid', AttributeType: 'S' },
    { AttributeName: 'email', AttributeType: 'S' },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'UidIndex',
      KeySchema: [{ AttributeName: 'uid', KeyType: 'HASH' }],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
      },
    },
    {
      IndexName: 'EmailIndex',
      KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
      },
    },
  ],
};
