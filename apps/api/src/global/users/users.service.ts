import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { DatabaseConstants } from '../db/db.constants';
import { User } from 'src/shared/types/user';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { DeleteCommandInput,
	GetCommandInput,
	PutCommandInput,
	UpdateCommandInput
	} from '@aws-sdk/lib-dynamodb';

/**
 * Service responsible for managing user-related operations.
 */
@Injectable()
export class UsersService {
	private tableName: string;

	/**
	 * Constructs a new instance of the UsersService class.
	 * 
	 * @param dbService - The database service used for interacting with the database.
	 * @param dbConstants - The constants used for accessing the database tables.
	 */
	constructor (
		private readonly dbService: DbService,
		private readonly dbConstants: DatabaseConstants,
	) {
		this.tableName = dbConstants.getTable('Users');
	}

	/**
	 * Creates a new user in the User Table.
	 * 
	 * @param userDetials - The details of the user to be created.
	 * @returns A promise that resolves to the created user.
	 */
	async createUser(userDetails: User): Promise<User> {
		const hashedPassword = crypto.createHash('sha256').update(userDetails.password).digest('hex');
		const user: User = {
			...userDetails,
			password: hashedPassword,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			isActive: true,
		};

		const params: PutCommandInput = {
			TableName: this.tableName,
			Item: user,
		};

		await this.dbService.putItem(params);
		return user;
	}

	/**
	 * Retrieves a user from the User Table by their ID.
	 * 
	 * @param uid - The ID of the user to retrieve.
	 * @returns A promise that resolves to the retriev ed user, or null if not found.
	 */
	async getUserById(uid: string): Promise<User | null> {
		const params: GetCommandInput = {
			TableName: this.tableName,
			Key: { uid },
		};

		const results = await this.dbService.getItem(params);
		return results ? results as User : null;
	}

	/**
	 * Updates a user with the specified UID and the provided fields.
	 * 
	 * @param {string} uid - The UID of the user to update.
	 * @param {Partial<User>} updatedFields - The fields to update in the user object.
	 * @returns {Promise<User | null>} - A promise that resolves to the updated user object, or null if the user does not exist.
	 */
	async updateUser(uid: string, updatedFields: Partial<User>): Promise<User | null> {
		// Dynamically construct the UpdateExpression, ExpressionAttributeNames, and ExpressionAttributeValues
		let updateExpression = "set"; // Initialize the UpdateExpression
		const expressionAttributeNames: Record<string, string> = {};
		const expressionAttributeValues: Record<string, any> = {};
	
		// Loop through each field in updatedFields to build the expressions
		Object.entries(updatedFields).forEach(([key, value], index) => {
			const attributeName = `#attr${index}`;
			const attributeValue = `:val${index}`;
	
			updateExpression += ` ${attributeName} = ${attributeValue},`;
			expressionAttributeNames[attributeName] = key; // Map the attribute name to the actual field name
			expressionAttributeValues[attributeValue] = value; // Map the attribute value
	
		});
	
		// Remove the trailing comma from updateExpression
		updateExpression = updateExpression.slice(0, -1);
	
		const params: UpdateCommandInput = {
			TableName: this.tableName,
			Key: { uid },
			UpdateExpression: updateExpression,
			ExpressionAttributeNames: expressionAttributeNames,
			ExpressionAttributeValues: expressionAttributeValues,
			ReturnValues: "ALL_NEW",
		};
	
		// Execute the update command in DynamoDB
		const result = await this.dbService.updateItem(params)
	
		return result.Attributes as User; // Return the updated user details
	}

	/**
	 * 
	 * @param uid 
	 */
	async deleteUser(uid: string): Promise<void> {
		const params: DeleteCommandInput = {
			TableName: this.tableName,
			Key: { uid },
		};

		await this.dbService.deleteItem(params);
	}
}

	

