import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbConstants {
  private readonly isProduction: boolean;
  private readonly tableSuffix: string;
  private readonly projectName: string;

  /**
   * Constructor to inject ConfigService and initialize constants.
   *
   * @param config - The ConfigService instance to access environment variables.
   */
  constructor(private readonly config: ConfigService) {
    // Fetch the project name from environment variables or use a default value
    this.projectName = this.config.get<string>(
      'PROJECT_NAME',
      'MadraMangaArabic'
    );

    // Determine if the environment is production based on NODE_ENV
    this.isProduction = this.config.get<string>('NODE_ENV') === 'prod';

    // Set the table suffix based on the environment
    this.tableSuffix = this.isProduction ? 'Prod' : 'Staging';
  }

  /**
   * Constructs the DynamoDB table name using the project name and environment suffix.
   *
   * @param name - The base name of the table.
   * @returns The constructed table name.
   */
  getTable(name: string): string {
    return `${this.projectName}_${name}_${this.tableSuffix}`;
  }

  /**
   * Constructs the primary key name for a given base name.
   *
   * @param name - The base name for the primary key.
   * @returns The constructed primary key name.
   */
  getPrimaryKey(name: string): string {
    return `${name.toUpperCase()}_${this.tableSuffix.toUpperCase()}`;
  }

  /**
   * Constructs the sort key name for a given base name.
   *
   * @param name - The base name for the sort key.
   * @returns The constructed sort key name.
   */
  getSortKey(name: string): string {
    return `${name.toUpperCase()}_${this.tableSuffix.toUpperCase()}_SECRET`;
  }
}
