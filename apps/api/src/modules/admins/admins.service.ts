import { Injectable } from "@nestjs/common";
import { DbConstants } from "src/global/db/db.constants";
import { DbService } from "src/global/db/db.service";

/**
 * @module AdminsService
 * @description
 * This service is responsible for managing admins in the application.
 * It provides the necessary methods for CRUD operations on the admins.
 */
@Injectable()
export class AdminsService {
	// The name of the table in DynamoDB
	private readonly tableName: string;

	/**
	 * Constructor for the AdminsService.
	 * 
	 * @param dbConstants - The DbConstants service for database operations.
	 * @param dbService - The DbService for database operations.
	 */
	constructor(
		private readonly dbConstants: DbConstants,
		private readonly dbService: DbService,
	) {
		// Set the table name
		const table = "Admins";
		this.tableName = this.dbConstants.getTable(table);
	}

	/**
	 * Creates a new admin in the database.
	 * 
	 * @param uid - The unique identifier of the admin.
	 * @param organizationId - The organization ID to which the admin belongs.
	 */
	async create(uid: string, organizationId: string) {
		// Create the admin object
		const params = {
			TableName: this.tableName,
			Item: {
				PK: this.dbConstants.getPrimaryKey("Admins"),
				SK: this.dbConstants.getSortKey(uid),
				uid: uid,
				organizationId: organizationId,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			},
		};

		// Store the admin in DynamoDB
		await this.dbService.putItem(params);
	}

	/**
	 * Deletes an admin from the database.
	 * 
	 * @param uid - The unique identifier of the admin.
	 * @param organizationId - The organization ID to which the admin belongs.
	 */
	async delete(uid: string, organizationId: string) {
		// Get the admin from the database
		const admin = await this.getAdmin(uid);
		if (!admin) {
			return new Error("Admin does not exist");
		}

		// Delete the admin from DynamoDB
		const params = {
			TableName: this.tableName,
			Key: {
				PK: { S: admin.PK },
				SK: { S: admin.SK },
			},
		};

		// Delete the admin from DynamoDB
		await this.dbService.deleteItem(params);
	}

	/**
	 * Retrieves all admins for a given organization.
	 * 
	 * @param organizationId - The organization ID to filter admins by.
	 * @returns An array of admin objects.
	 */
	async getAdmins(organizationId: string) {
		// Query the database for admins with the given organization ID
		const params = {
			TableName: this.tableName,
			IndexName: "OrganizationIndex",
			KeyConditionExpression: "organizationId = :organizationId",
			ExpressionAttributeValues: {
				":organizationId": { S: organizationId },
			},
		};

		const items = await this.dbService.query(params);
		return items;
	}

	/**
	 * Retrieves an admin by their unique identifier.
	 * 
	 * @param uid - The unique identifier of the admin.
	 * @returns The admin object if found, otherwise null.
	 */
	async getAdmin(uid: string) {
		// Query the database for admins with the given unique identifier
		const params = {
			TableName: this.tableName,
			IndexName: "UidIndex",
			KeyConditionExpression: "uid = :uid",
			ExpressionAttributeValues: {
				":uid": { S: uid },
			},
		};

		const items = await this.dbService.query(params);

		// Return null if no admin is found
		if (items.length === 0) {
			return null;
		}

		// Return the admin object
		return this.dbService.mapDynamoDBItemToObject(items[0]);
	}
}
