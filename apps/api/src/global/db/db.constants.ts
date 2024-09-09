
import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConstants {
	private isProduction: boolean;
	private tableSuffix: string;
	private projectName: string;

	constructor(private readonly config: ConfigService) {
    // Fetch the project name from environment variables or use a default value
		this.projectName = this.config.get<string>('PROJECT_NAME') || "HOOD";
    // Determine if the environment is production based on NODE_ENV
		this.isProduction = this.config.get<string>('NODE_ENV') === 'Prod';
    // Set the table suffix based on the environment
		this.tableSuffix = this.isProduction ? 'Prod' : 'Staging';
	}

	/**
	 * Constructs the DynamDB table name using the project name and environment suffix.
	 * 
	 * @param name The base name of the table,
	 * @returns The constructed table name.
	 */
	getTable(name: string) {
		return `${this.projectName}_${name}_${this.tableSuffix.toUpperCase()}`;
	}

	/**
	 * 
	 * @param name The base name for the primary key.
	 * @returns The constructed primary key name.
	 */
  getPrimaryKey(name: string) {
    return `${name.toUpperCase()}_${this.tableSuffix.toUpperCase()}`;
  }

	/**
   * Constructs the sort key name for a given base name.
   *
   * @param name - The base name for the sort key.
   * @returns The constructed sort key name.
   */
  getSortKey(id: string) {
    return `${this.projectName}_${id}_${this.tableSuffix.toUpperCase()}_SECRET`;
  }
}