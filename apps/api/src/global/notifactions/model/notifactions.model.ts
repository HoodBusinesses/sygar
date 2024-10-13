import { LocalTableInput } from "src/shared/types/db";

export interface Notifications {
	PK: string;
	SK: string;
	uid: string;
	userUid: string;
	message: string;
	viewed: boolean;
	createdAt: number;
	updatedAt?: number;
}

export const NotificationSchema: LocalTableInput = {
	TableName: 'Notifications',
	AttributeDefinitions: [
		{ AttributeName: 'uid', AttributeType: 'S'},
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: 'UidIndex',
			KeySchema: [
				{ AttributeName: 'uid', KeyType: 'HASH'},
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			}
		},
	]
}