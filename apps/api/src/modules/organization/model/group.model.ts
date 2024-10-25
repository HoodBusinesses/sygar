// 1. **Formation Group Fields**                                                       
// - **Animator**: Name or identifier of the facilitator.
// - **Formateur**: Name or identifier of the trainer.
// - **Thème**: Topic or theme of the formation.
// - **Lieu**: Location where the formation will take place.
// - **Nbr of Participants**: Total number of participants.
// - **Participants**: List of participants involved (names or IDs).
// - **Action**: Status field with options (e.g., “Planned” or “Not Planned”).

import { LocalTableInput } from "src/shared/types/db";
import { IsEnum, IsNumber } from 'class-validator';

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
	MAXEND = 0, // 12:00 AM in milliseconds
}

export class WorkingTime {
    @IsEnum(DaysOfWrork)
    day!: DaysOfWrork;

    @IsNumber()
    startTime!: number;

    @IsNumber()
    endTime!: number;
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
    formateurUid: string; // we will store it in an isolated table
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
