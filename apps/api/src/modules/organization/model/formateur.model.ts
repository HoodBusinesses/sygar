import { LocalTableInput } from "src/shared/types/db";
import { WorkingTime } from "./group.model";

export class Formateur {
    uid!: string;
    name!: string;
    email!: string;
    workingHours!: WorkingTime[];
}

export const FormateurSchema: LocalTableInput = {
	TableName: 'Formateurs',
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
