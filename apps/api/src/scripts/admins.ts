import { PutItemCommandInput, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ConfigService } from "@nestjs/config"
import { DbConstants } from "../global/db/db.constants";
import { DbService } from "../global/db/db.service";
import { ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { config } from "dotenv";

// The `config()` function is likely being called to load and configure environment variables or application settings.
// This is a common practice in Node.js applications to ensure that configuration settings are properly initialized.
config();
const configService = new ConfigService();
const dbConstants = new DbConstants(configService);
const dbService = new DbService(configService);

const admins = [
	{
		uid: "superadmin",
		email: configService.get<string>('SUPERADMIN_EMAIL', "superadmin@hood.com"),
		password: configService.get<string>('SUPERADMIN_PASSWORD', "superadmin"),
		role: "SUPERADMIN",
		createdAt: Date.now(),
		updatedAt: Date.now()
	},
	{
		uid: "admin",
		email: configService.get<string>('ADMIN_EMAIL', "admin@hood.com"),
		password: configService.get<string>('ADMIN_PASSWORD', "admin"),
		role: "ADMIN",
		createdAt: Date.now(),
		updatedAt: Date.now()
	}
];

/**
 * Creates admin users in the database.
 * 
 * This function iterates over an array of admin objects
 * and checks if each admin already exists in the database.
 * If an admin already exists, it logs a message and continues
 * to the next admin. If an admin does not exist, it creates a
 * new admin record in the database.
 */
export const createAdmins = async () => {
	for (const admin of admins) {
		// Prepare the parameters for scanning the Users table to check 
		// if the admin already exists
		const paramEmail: ScanCommandInput = {
				TableName: dbConstants.getTable('Users'),
				FilterExpression: "email = :email",
				ExpressionAttributeValues: {
						":email": { S: admin.email }
				}
		};
		// Execute the scan command and destructure the
		// Itemsfrom the response
		try {
			const { Items } = await dbService.getClient().send(new ScanCommand(paramEmail));
			// If the admin already exists in the Users table,
			// log a message and skip to the next admin
			if (Items && Items.length > 0) {
					console.log(`Admin ${admin.email} already exists.`);
					continue;
			}
		} catch (e) {
			// Log an error message if there is an issue scanning the Users table
			console.error(`Error scanning for admin ${admin.email}: ${(e as Error).message}`);
		}
		// Prepare the parameters for adding the new admin to the Users table
		const param: PutItemCommandInput = {
				TableName: dbConstants.getTable('Users'),
				Item: {
						uid: { S: admin.uid },
						email: { S: admin.email },
						password: { S: admin.password },
						role: { S: admin.role },
						createdAt: { N: admin.createdAt.toString() },
						updatedAt: { N: admin.updatedAt.toString() }
				}
		};
		console.log(dbConstants.getTable('Users'));
		try {
			// Execute the put item command to add the new admin to the Users table
			await dbService.getClient().send(new PutItemCommand(param));
			console.log(`Admin ${admin.email} created successfully.`);
		} catch (error) {
			// Log an error message if there is an issue creating the admin
			if (error instanceof Error)
				console.error(
						`Error creating admin ${admin.email}: ${error.message}`,
				);
		}
	}	
	}

// main function to create admins
async function main() {
	await createAdmins();
}

main(); // This is the main function that will run the script