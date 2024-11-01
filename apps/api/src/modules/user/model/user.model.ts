import { LocalTableInput } from "src/shared/types/db";

// Define the roles for the users
export enum UserRoles {
	SYGAR_ADMIN = 'SYGAR_ADMIN',
	SYGAR_USER = 'SYGAR_USER',
	ORG_ADMIN = 'ORG_ADMIN',
	ORG_USER = 'ORG_USER',
}

// Define the national identifier types
export enum NationalIdentifierTypes {
	CIN = 'CIN',
	PASSPORT = 'PASSPORT',
	PERMIS = 'PERMIS',
}

// Define the User interface
export interface User {
	PK: string;
	SK: string;
	uid: string;
	cnss: string;
	nationalIdentifier: string;
	nationalIdentifierType: NationalIdentifierTypes;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: UserRoles;
	organizationId: string;
	isActive: boolean;
	phone: string;
	resetPasswordToken?: string | null;
	resetPasswordTokenExpiresAt?: number | null;
	passwordUpdatedAt?: number | null;
	createdAt: number;
	updatedAt?: number;
}


// Define the schema for the 'Users' table
export const UserSchema: LocalTableInput = {
	TableName: 'Users', // Name of the table
	AttributeDefinitions: [
		{ AttributeName: 'email', AttributeType: 'S' }, // Define 'email' attribute of type String
		{ AttributeName: 'cnss', AttributeType: 'S' }, // Define 'cnss' attribute of type String'
		{ AttributeName: 'resetPasswordToken', AttributeType: 'S' }, // Define 'resetPasswordToken' attribute of type String
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: "EmailIndex",
			KeySchema: [
				{ AttributeName: 'email', KeyType: 'HASH'}, // Define 'email' as the hash key for the index
			],
			Projection: {
				ProjectionType: 'ALL', // Include all attributes in the index
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3, // Read capacity units for the index
				WriteCapacityUnits: 3, // Write capacity units for the index
			}
		},
		{
			IndexName: "CnssIndex", // Add the new index for 'cnss'
			KeySchema: [
				{ AttributeName: 'cnss', KeyType: 'HASH'}, // Define 'cnss' as the hash key for the index
			],
			Projection: {
				ProjectionType: 'ALL', // Include all attributes in the index
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3, // Read capacity units for the index
				WriteCapacityUnits: 3, // Write capacity units for the index
			}
		},
		{
			IndexName: "ResetPasswordTokenIndex", // Add the new index for 'cnss'
			KeySchema: [
				{ AttributeName: 'resetPasswordToken', KeyType: 'HASH'}, // Define 'cnss' as the hash key for the index
			],
			Projection: {
				ProjectionType: 'ALL', // Include all attributes in the index
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3, // Read capacity units for the index
				WriteCapacityUnits: 3, // Write capacity units for the index
			}
		}
	],
}
