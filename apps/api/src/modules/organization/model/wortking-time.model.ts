import { LocalTableInput } from "src/shared/types/db";
import { DaysOfWrork, WorkTimeLimit } from "./group.model";

export interface WorkingTime {
  PK: string;
  SK: string;
  uid: string;
  animatorUid: string;
  groupUid?: string;
  day: DaysOfWrork;
  startTime: number;
  endTime: number;
  createdAt: number;
  updatedAt?: number;
}

export const WorkingTimeSchema: LocalTableInput = {
  TableName: 'WorkingTimes',
  AttributeDefinitions: [
    { AttributeName: 'animatorUid', AttributeType: 'S' },
    { AttributeName: 'groupUid', AttributeType: 'S' },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'AnimatorIndex',
      KeySchema: [
        { AttributeName: 'animatorUid', KeyType: 'HASH' },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
      },
    },
    {
      IndexName: 'GroupIndex',
      KeySchema: [
        { AttributeName: 'groupUid', KeyType: 'HASH' },
      ],
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

