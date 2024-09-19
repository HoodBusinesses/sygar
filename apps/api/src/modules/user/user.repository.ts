import { Injectable } from "@nestjs/common";
import { DbConstants } from "src/global/db/db.constants";
import { DbService } from "src/global/db/db.service";
import { User } from "./model/user.model";
import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class userRepository {
	private readonly tableName: string;

	constructor(
		private readonly dbService: DbService,
		private readonly dbConstants: DbConstants,
	) {
		const table = 'Users'; // The table name
		this.tableName = dbConstants.getTable(table); // The full table name
	}

	/**
	 * Find a user by email.
	 *
	 * @param email - The email of the user to find.
	 * @returns The user found or null if not found.
	 */
	async findByEmail(email: string): Promise<User | null> {
		// Query the user by email
		const params: QueryCommandInput = {
			TableName: this.tableName,
			IndexName: 'EmailIndex',
			KeyConditionExpression: 'email = :email',
			ExpressionAttributeValues: {
				':email': { S: email },
			},
		};
		
		try {
			// Fetch the user from the database
			const Items = await this.dbService.query(params);
		
			// Return the user found or null if not found
			if (!Items || Items.length === 0) {
				return null;
			}

			// Return the user found after mapping the DynamoDB item to a User object
			return this.dbService.mapDynamoDBItemToObject(Items[0]) as User;
		} catch(_) {
			return null;
		}
	}

}