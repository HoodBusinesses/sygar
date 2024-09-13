import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { AttributeValue, ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { DbConstants } from '../db/db.constants';
import { User } from 'src/shared/types/user';

/**
 * UsersRepository handles interactions with DynamoDB for user data operations.
 *
 * It centralizes database queries and data transformations, including:
 * - Retrieving user information by email.
 * - Mapping DynamoDB items to the User model.
 *
 * Dependencies:
 * - DbService: For DynamoDB interactions.
 * - DbConstants: For table names and settings.
 *
 * Usage:
 * - Injected into services like UsersService and AuthService for user-related operations.
 */

@Injectable()
export class UsersRepository {
  constructor(
    private readonly dbService: DbService,
    private readonly dbConstants: DbConstants,
  ) {}

  // Method to find a user by email
	async findByEmail(email: string): Promise<User | null> {
		// Define the parameters for the DynamoDB scan command
		const param: ScanCommandInput = {
				TableName: this.dbConstants.getTable('Users'), // Table name from constants
				FilterExpression: "email = :email", // Filter expression to match the email
				ExpressionAttributeValues: {
				":email": { S: email } // Email value to filter by
			}
		};

		// Execute the scan command and destructure the Items from the response
		const { Items } = await this.dbService.getClient().send(new ScanCommand(param));
			
		// If items are found and the first item is not null, map it to a User object
		if (Items && Items.length > 0 && Items[0])  {
			return this.mapDynamoDBItemToUser(Items[0]);
		}
		// Return null if no items are found
		return null;
	}

	// Private method to map a DynamoDB item to a User object
	private mapDynamoDBItemToUser(item: Record<string, AttributeValue>): User | null {
		const user: any = {}; // Initialize an empty user object

		// Iterate over each key in the item
		for (const key in item) {
			if (item[key] === undefined) continue; // Skip undefined values
            
			// Map string attributes
			if (item[key].S) {
				user[key] = item[key].S;
				// Map number attributes
			} else if (item[key].N) {
				user[key] = Number(item[key].N);
				// Map boolean attributes
			} else if (item[key].BOOL) {
				user[key] = item[key].BOOL;
			}
		}
		// Return the user object cast to User type, or null if user is undefined
		return user === undefined ? null : user as User;
	}
}