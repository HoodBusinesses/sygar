import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { DaysOfWrork } from "./group.model";
import { LocalTableInput } from "src/shared/types/db";

export enum WorkerType {
	Animators = 'Animators',
	Formators = 'Formators'
}

export interface WorkingTime {
	PK: string;
	SK: string;
	uid: string;
	workerType: WorkerType;
	email: string;
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
		{ AttributeName: 'email', AttributeType: 'S' },
		{ AttributeName: 'uid', AttributeType: 'S' },
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: 'EmailIndex',
			KeySchema: [
				{ AttributeName: 'email', KeyType: 'HASH' },
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
			IndexName: 'UidIndex',
			KeySchema: [
				{ AttributeName: 'uid', KeyType: 'HASH' },
			],
			Projection: {
				ProjectionType: 'ALL',
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		}
	],
}