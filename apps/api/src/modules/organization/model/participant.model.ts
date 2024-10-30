import { LocalTableInput } from "src/shared/types/db";

export interface EnrolledGroup {
    groupId: string;
    startDate: string; // Start date of the group
    endDate: string; // End date of the group
}

export class Participant {
    uid!: string; // Unique identifier for the participant (e.g., CNSS or another ID)
    firstName!: string;
    lastName!: string;
    email!: string; // Contact information for notifications
    status!: string; // e.g., 'active', 'inactive', or other statuses as needed
    enrolledGroups!: EnrolledGroup[]; // Array of groups the participant is enrolled in
}

export const ParticipantSchema: LocalTableInput = {
	TableName: 'Participants',
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