import { Injectable } from '@nestjs/common';
import { DbService } from '../global/db/db.service';
import { DatabaseConstants } from '../global/db/db.constants';
import { ConfigService } from '@nestjs/config';

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
 * Initializes the database service and creates necessary tables if they don't exist.
 * 
 * @remarks
 * This function checks if the tables already exist in the DynamoDB database and creates them automatically if not.
 * It will keep trying to connect to the database if it is not listening yet.
 * 
 * @returns A Promise that resolves when the initialization is complete.
 */
export async function initializeDbService() {
  const configService = new ConfigService();
  const databaseConstants = new DatabaseConstants(configService);
  const dbService = new DbService(configService, databaseConstants);

  const initTables = new InitTables(dbService);

  let shouldContinue = await initTables.init();
  while (!shouldContinue) {
    shouldContinue = await initTables.init();
    if (!shouldContinue) {
      console.warn("Faild To connect to DynamoDB database, Retry!!!");
      await sleep(5000); // Sleep for 5 seconds before re-initializing
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
