// 1. **Formation Group Fields**                                                       
// - **Animator**: Name or identifier of the facilitator.
// - **Formator**: Name or identifier of the trainer.
// - **Thème**: Topic or theme of the formation.
// - **Lieu**: Location where the formation will take place.
// - **Nbr of Participants**: Total number of participants.
// - **Participants**: List of participants involved (names or IDs).
// - **Action**: Status field with options (e.g., “Planned” or “Not Planned”).

import { LocalTableInput } from "src/shared/types/db";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { WorkerType } from "./working-time.model";

export enum DaysOfWrork {
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday",
    Sunday = "sunday"
}

export enum WorkTimeLimit {
	MINSTART = 12 * 60 * 60 * 1000, // 12:00 PM in milliseconds
	MAXEND = 18 * 60 * 60 * 1000, // 18:00 PM in milliseconds
}


export class UpdateWorkingTimeDto {
	@IsOptional()
	@IsEnum(DaysOfWrork)
	day?: DaysOfWrork;

	@IsOptional()
	@IsNumber()
	startTime?: number;

	@IsOptional()
	@IsNumber()
	endTime?: number;
}

export class CreateWorkingTimeDto {
	@IsNotEmpty()
    @IsEnum(DaysOfWrork)
	day!: DaysOfWrork;

	@IsNotEmpty()
	@IsNumber()
	startTime!: number;

	@IsNotEmpty()
	@IsNumber()
	endTime!: number;

	@IsNotEmpty()
	@IsEnum(WorkerType)
	workerType!: WorkerType;

	@IsNotEmpty()
	@IsString()
	groupUid!: string;
}

export enum GroupAction {
	Planned = "Planned",
	NotPlanned = "Not Planned",
}
export interface Group {
    PK: string;
    SK: string;
    uid: string;
    themeId: string;
    animatorsUid: string[]; // we will store it in an isolated table
    formatorUid: string; // we will store it in an isolated table
    theme: string; // the title of the theme
    location: string;
    participantsUid: string[]; // we will store it in an isolated table
    action: GroupAction;
}

export const GroupSchema: LocalTableInput = {
	TableName: 'Groups',
	AttributeDefinitions: [
		{ AttributeName: 'uid', AttributeType: 'S' },
	],
	GlobalSecondaryIndexes: [
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
		},
	],
};
