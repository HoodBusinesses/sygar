export enum AbilitiesEnum {
	MANAGE_USERS = "MANAGE_USER",
	READ_USERS = "READ_USER",
	CREATE_USERS = "CREATE_USER",
	UPDATE_USERS = "UPDATE_USER",
	DELETE_USERS = "DELETE_USER",

	MANAGE_ORGANIZATIONS = "MANAGE_ORGANIZATION",
	READ_ORGANIZATIONS = "READ_ORGANIZATION",
	CREATE_ORGANIZATIONS = "CREATE_ORGANIZATION",
	UPDATE_ORGANIZATIONS = "UPDATE_ORGANIZATION",
	DELETE_ORGANIZATIONS = "DELETE_ORGANIZATION",
}

export interface AbilityInterface {
	action: string;
	subject: string;
	userUid: string;
	organizationId?: string;
	createdAt: number;
	updatedAt: number;
	identifier: string;
	PK: string;
	SK: string;
}