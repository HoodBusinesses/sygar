import { ConsoleLogger, Injectable } from '@nestjs/common';
import { DbService } from '../global/db/db.service';
import { DatabaseConstants } from '../global/db/db.constants';
import { ConfigService } from '@nestjs/config';
import { NationIdentifierTypes } from 'src/shared/constants/nit.enums';
import { User } from 'src/shared/types/user';
import { Roles } from 'src/shared/constants/roles.enums';
import { UsersService } from 'src/global/users/users.service';
import { urlencoded } from 'express';

/**
 * InitTables class that initializes the creation of tables if they do not exist inside the DynamoDB database.
 */
@Injectable()
export class InitTables {
  constructor(private readonly dbService: DbService) {}

  public async init(): Promise<boolean> {
    let flag = true; // We will use it to track the state of table creation
    const tables = ['Users', 'Abilities', 'Organizations', 'Admins', 'Bills']; // List of table names to create

		try {
			for (const table of tables) {
				const tableExists = await this.dbService.checkTableExists(table);
				if (!tableExists) {
					await this.dbService.createTable(table);
				}
				// To make sure all tables exist
				if (flag) {
					flag = await this.dbService.checkTableExists(table);
				}
			}
			return flag;
		} catch (error) {
			return false;
		}
	}
}

/**
 * Initializes the database service and creates necessary tables.
 * 
 * This function initializes the database service by creating instances of ConfigService, DatabaseConstants,
 * DbService, and UsersService. It then creates an instance of InitTables to initialize the necessary tables
 * in the database. If the initialization fails, it retries after a 5-second delay. If the environment is set
 * to 'Staging', it checks if the users from the sygarUsers array exist in the database and creates them if
 * they don't.
 * 
 * @returns {Promise<void>} A promise that resolves once the database service is initialized and tables are created.
 */
export async function initializeDbService() {
  const configService = new ConfigService();
  const dbConstants = new DatabaseConstants(configService);
  const dbService = new DbService(configService, dbConstants);
  const usersService = new UsersService(dbService, dbConstants);

  const initTables = new InitTables(dbService);

  let shouldContinue = await initTables.init();
  while (!shouldContinue) {
    shouldContinue = await initTables.init();
    if (!shouldContinue) {
      console.warn("Faild To connect to DynamoDB database, Retry!!!");
      await sleep(5000); // Sleep for 5 seconds before re-initializing
    }
  }

  /**
   * This section of code checks if the environment is set to 'Staging' and if so, it iterates over the sygarUsers array.
   * For each user in the array, it checks if the user already exists in the 'Users' table of the database by querying
   * the 'uid' attribute. If the user does not exist, it creates the user using the usersService.createUser() method.
   * 
   * Note: Make sure to replace the example IDs and hashed passwords with real values and implement a secure password
   * hashing mechanism.
   */
  if (configService.get<string>('NODE_ENV') === 'Staging') {
    for (const user of sygarUsers) {
      const returnedUsers = await dbService.getItemsByQuery('Users', 'uid', user.uid);
      if (!returnedUsers || !returnedUsers.length) {
          await usersService.createUser(user);
      }
    }
  }
}

/**
 * Suspends the execution of the current async function for a specified number of milliseconds.
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified number of milliseconds.
 */
async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Represents an array of Sygar users for dev stage
 */
const sygarUsers: User[] = [
  {
    uid: "1", // Example ID, replace with a real unique ID generation logic
    cnss: "SYGAR-CNSS",
    nationalIdentifier: "SYGAR-ID-ADMIN",
    nationalIdentifierType: NationIdentifierTypes.CIN,
    firstName: "Sygar",
    lastName: "Admin",
    email: "sygaradmin@example.com",
    password: "hashed_password", // Make sure to hash the password securely
    role: Roles.ADMIN,
    isActive: true,
    phone: "000-111-2222",
    resetPasswordToken: "",
    resetPasswordTokenExpiresAt: new Date().toISOString(),
    passwordChangeAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    uid: "2", // Example ID, replace with a real unique ID generation logic
    cnss: "SYGAR-CNSS",
    nationalIdentifier: "SYGAR-ID-SUPERADMIN",
    nationalIdentifierType: NationIdentifierTypes.CIN,
    firstName: "Sygar",
    lastName: "SuperAdmin",
    email: "sygarsuperadmin@example.com",
    password: "hashed_password", // Make sure to hash the password securely
    role: Roles.SUPER_ADMIN,
    isActive: true,
    phone: "111-222-3333",
    resetPasswordToken: "",
    resetPasswordTokenExpiresAt: new Date().toISOString(),
    passwordChangeAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];