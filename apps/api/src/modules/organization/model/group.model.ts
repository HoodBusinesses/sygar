import { LocalTableInput } from "src/shared/types/db";

/**
 * Enum for the days of work
 */
export enum DaysOfWrork {
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday",
    Sunday = "sunday"
}

/**
 * Enum for the action of the group
 */
export enum GroupAction {
	Planned = "Planned",
	NotPlanned = "NotPlanned",
}

/**
 * Interface for a group
 */
export interface Group {
    PK: string;
    SK: string;
    uid: string;
    themeId: string; // the id of the theme
    theme: string; // the title of the theme
    location: string; // the location of the group
    action: GroupAction; // the action of the group eg: Planned or NotPlanned
	startDate: number; // the start date of the group
	endDate: number; // the end date of the group
	createdAt: number; // the creation date of the group
	updatedAt?: number; // the update date of the group
}

/**
 * Enum for the type of the enrolled member
 */
export enum EnrolledType {
	Animator = "Animator",
	Formator = "Formator",
	Participant = "Participant",
}

/**
 * Schema for the group table
 */
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
