import { PutCommand, GetCommand, UpdateCommand, UpdateCommandInput, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import docClient from "src/global/db/dynamo.config";
import { User } from "src/shared/users.interface";
import { Roles } from "src/shared/enums";
import { DatabaseConstants } from "src/global/db/db.constants";
import { Put } from "@nestjs/common";
import { resourceUsage } from "process";
import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';


// `UserService` handles all CRUD operations for users
@Injectable()
export class UserService {
	private tableName: string;

	constructor(private readonly constants: DatabaseConstants) {
		this.tableName = constants.getTable("Users");
	}
	

	// Create a new user
	async createUser(userDetials: User): Promise<User> {
		const uid = this.constants.getPrimaryKey(uuidv4());
		const hashedPassword = crypto.createHash('sha256').update(userDetials.password).digest('hex');
		const user: User = {
			...userDetials,
			uid,
			password: hashedPassword,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			isActive: true,
		};

		const params = {
			TableName: this.tableName,
			Item: user,
		};

		docClient.send(new PutCommand(params));
		return user;
	}

	// Get a user by ID
	async getUserById(uid: string): Promise<User | null> {
		const params = {
			TableName: this.tableName,
			Key: { uid },
		};

		const results = await docClient.send(new GetCommand(params));
		return results.Item ? results.Item as User : null;
	}

	// Update user details
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
	const result = await docClient.send(new UpdateCommand(params));

	return result.Attributes as User; // Return the updated user details
}


	// Delete a user by uid
	async deleteUser(uid: string): Promise<void> {
		const params = {
			TableName: this.tableName,
			Key: { uid },
		};

		await docClient.send(new DeleteCommand(params));
	}

	// Get all users
	async getAllUsers(): Promise<User[] | null> {
		const params = { TableName: this.tableName };

		const results = await docClient.send(new ScanCommand(params));
		return results.Items ? results.Items as User[] : null;
	}
}