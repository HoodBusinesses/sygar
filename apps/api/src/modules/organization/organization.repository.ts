import { Injectable } from "@nestjs/common";
import { DbConstants } from "src/global/db/db.constants";
import { DbService } from "src/global/db/db.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { PutCommandInput, QueryCommandInput, ScanCommandInput, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { Organization } from "./model/organization.model";
import { v4 as uuid } from 'uuid';
import { DeleteItemCommandInput, PutItemCommandInput, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";

/**
 * @module OrganizationRepository
 * @description
 * This repository is responsible for managing organizations in the database.
 * It provides the necessary methods for CRUD operations on the organizations.
 */
@Injectable()
export class OrganizationRepository {
	private readonly tableName: string;
	private readonly primaryKey: string;
	private readonly themeTableName: string;
	private readonly themePrimaryKey: string;
	
	/**
	 * Constructor for the OrganizationRepository.
	 * 
	 * @param dbService - The DbService for database operations.
	 * @param dbConstants - The DbConstants service for database operations.
	 */
	constructor(
		private readonly dbService: DbService,
		private readonly dbConstants: DbConstants,
	) {
		const table = 'Organizations';
		this.tableName = dbConstants.getTable(table);
		this.primaryKey = this.dbConstants.getPrimaryKey(table);

		const themeTable = 'Themes';
		this.themeTableName = dbConstants.getTable(themeTable);
		this.themePrimaryKey = this.dbConstants.getPrimaryKey(themeTable);
	}

	/**
	 * Get the next counter value for the organization counter.
	 * 
	 * @returns The next counter value.
	 */
	async getNextCounterValueOfOrg() {
		const params: ScanCommandInput = {
			TableName: this.dbConstants.getTable('Counters'),
			FilterExpression: 'counterName = :counterName',
			ExpressionAttributeValues: {
				':counterName': { S: 'organizationCounter' },
			},
		};
		const items = await this.dbService.scanItems(params);
		if (items.length === 0) {
			return 0;
		}
		return this.dbService.mapDynamoDBItemToObject(items[0]).counterValue as number;
	}

	/**
	 * Increment the counter for the organization.
	 * 
	 * @param counter - The current counter value.
	 */
	async incrementOrgCounter(counter: number) {
		const counterName = 'organizationCounter';

		if (counter === 0) {
			const params: PutCommandInput = {
				TableName: this.dbConstants.getTable('Counters'),
				Item: {
					PK: this.primaryKey,
					SK: this.dbConstants.getSortKey(counterName),
					counterName: counterName,
					counterValue: '1',
				},
			};
			await this.dbService.putItem(params);
		} else {
			const params: UpdateItemCommandInput = {
				TableName: this.dbConstants.getTable('Counters'),
				Key: {
					PK: { S: this.primaryKey },
					SK: { S: this.dbConstants.getSortKey(counterName) },
				},
				UpdateExpression: 'SET counterValue = :counterValue',
				ExpressionAttributeValues: {
					':counterValue': { N: (counter + 1).toString() },
				},
			};
			await this.dbService.updateItem(params);
		}
	}

	/**
	 * Create a new organization.
	 * 
	 * @param createOrganizationDto - The data for creating the organization.
	 * @returns The created organization.
	 */
	async create(createOrganizationDto: CreateOrganizationDto) {
		const uid = uuid();
		// Create the organization
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month and format it to 2 digits
		const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day and format it to 2 digits
		const counter = await this.getNextCounterValueOfOrg(); // Get the next counter value
		const formattedCounter = String(counter).padStart(4, '0'); // Format the counter to 4 digits	

		// Create the organization object
		const Item: Organization = {
			uid: uid,
			PK: this.primaryKey,
			SK: this.dbConstants.getSortKey(uid),
			...createOrganizationDto,
			id: counter,
			key: `${year}-${month}-${day}-${formattedCounter}`, // YYYYMMDDCCCC
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};

		// Add the organization to the database
		const params: PutItemCommandInput = {
			TableName: this.tableName,
			Item: Item as Record<string, any>,
		};

		// Add the organization to the database
		await this.dbService.putItem(params);

		// Increment the counter for the organization	
		await this.incrementOrgCounter(Number(counter));

		// Return the created organization
		return Item;
	}

	/**
	 * Update an existing organization.
	 * 
	 * @param cnss - The CNSS of the organization to update.
	 * @param updateOrganizationDto - The data for updating the organization.
	 * @returns The updated organization.
	 */
	async updateOrganization(cnss: string, updateOrganizationDto: UpdateOrganizationDto) {
		// Find the organization by CNSS
		const organization = await this.findByCnss(cnss);
		if (!organization) {
			return new Error('organizationDoesntExists');
		}

		// Update the organization
		const params: UpdateItemCommandInput = {
			TableName: this.tableName,
			Key: {
				PK: { S: organization.PK },
				SK: { S: organization.SK },
			},
			UpdateExpression: 'SET #name = :name, #freeTrial = :freeTrial, #updatedAt = :updatedAt',
			ExpressionAttributeNames: {
				'#name': 'name',
				'#freeTrial': 'freeTrial',
				'#updatedAt': 'updatedAt',
			},
			ExpressionAttributeValues: {
				':name': { S: updateOrganizationDto.name ?? organization.name },
				':freeTrial': { N: updateOrganizationDto.freeTrial?.toString()  ?? organization.freeTrial.toString()},
				':updatedAt': { N: Date.now().toString() },
			},
		};

		// Update the organization in the database
		await this.dbService.updateItem(params);

		// Return the updated organization
		return { ...organization, ...updateOrganizationDto };
	}

	/**
	 * Delete an existing organization.
	 * 
	 * @param cnss - The CNSS of the organization to delete.
	 * @returns The deleted organization.
	 */
	async deleteOrganization(cnss: string) {
		// Find The organization by CNSS
		const organization = await this.findByCnss(cnss);
		if (!organization) {
			return new Error('organizationDoesntExists');
		}

		// Delete the organization
		const params: DeleteItemCommandInput = {
			TableName: this.tableName,
			Key: {
				PK: { S: organization.PK },
				SK: { S: organization.SK },
			},
		};

		// Delete the organization from the database
		await this.dbService.deleteItem(params);

		// Return the deleted organization
		return { message: 'Organization deleted successfully' };
	}


	/**
	 * Find an organization by CNSS.
	 * 
	 * @param cnss - The CNSS of the organization to find.
	 * @returns The organization found or null if not found.
	 */
	async findByCnss(cnss: string) {
		// Query the organization by CNSS
		const params: QueryCommandInput = {
			TableName: this.tableName,
			IndexName: 'CnssIndex',
			KeyConditionExpression: 'cnss = :cnss',
			ExpressionAttributeValues: {
				':cnss': { S: cnss },
			},
		};
	
		try {
			// Fetch the organization from the database
			const Items = await this.dbService.query(params);

			// Return the organization found or null if not found
			if (!Items || Items.length === 0) {
				return null;
			}

			// Return the organization found after mapping the DynamoDB item to an Organization object
			return this.dbService.mapDynamoDBItemToObject(Items[0]);
		} catch(_) {
			// Return null if an error occurs
			return null;
		}
	}


	/**
	 * This method fetches all organizations from the database.
	 * @param page - The page number
	 * @param limit - The number of items per page
	 * @param name - The name of the organization
	 * @param year - The year of creation
	 * @returns The list of organizations
	 */
	async getAll(page: number, limit: number, name?: string, year?: number) {
		page = !page ? 1: page;
		limit = !limit ? 10: limit;
		const params: ScanCommandInput = {
			TableName: this.tableName,
			FilterExpression: '',
			ExpressionAttributeNames: {}, // Initialize as an empty object
			ExpressionAttributeValues: {}, // Initialize as an empty object
		};
	
		// Add filter expression for name
		if (name) {
			params.FilterExpression += 'contains(#name, :name)';
			params.ExpressionAttributeNames!['#name'] = 'name'; // Use non-null assertion
			params.ExpressionAttributeValues![':name'] = { S: name }; // Use non-null assertion
		}
	
		// Add filter expression for year based on createdAt timestamp
		if (year) {
			if (params.FilterExpression) {
				params.FilterExpression += ' AND ';
			}
			params.FilterExpression += '#createdAt BETWEEN :yearStart AND :yearEnd';
			params.ExpressionAttributeNames!['#createdAt'] = 'createdAt'; // Use non-null assertion
			
			const yearStart = new Date(year, 0, 1).getTime().toString(); // Jan 1st of the year
			const yearEnd = Date.now().toString(); // Current timestamp

			params.ExpressionAttributeValues![':yearStart'] = { N: yearStart }; // Use non-null assertion
			params.ExpressionAttributeValues![':yearEnd'] = { N: yearEnd }; // Use non-null assertion
		}
	
		// If no filters were set, remove the attributes to simplify the scan
		if (!params.FilterExpression) {
			delete params.FilterExpression;
			delete params.ExpressionAttributeNames; 
			delete params.ExpressionAttributeValues;
		}
	
		try {
			const Items = await this.dbService.scanItems(params);
			// Implement pagination
			const startIndex = (page - 1) * limit;
			const endIndex = page * limit;
			const paginatedItems = Items.slice(startIndex, endIndex);
	
			// Map each DynamoDB item to an Organization object
			return paginatedItems.map(item => this.dbService.mapDynamoDBItemToObject(item));
		} catch (error) {
			return [];
		}
	}
	
	/**
	 * Create a new theme.
	 * 
	 * @param createThemeDto - The data for creating the theme.
	 * @returns The created theme.
	 */
	async getNextCounterValueOfTheme() {
		const params: ScanCommandInput = {
			TableName: this.dbConstants.getTable('Counters'),
			FilterExpression: 'counterName = :counterName',
			ExpressionAttributeValues: {
				':counterName': { S: 'themeCounter' },
			},
		};
		const items = await this.dbService.scanItems(params);
		if (items.length === 0) {
			return 0;
		}
		return this.dbService.mapDynamoDBItemToObject(items[0]).counterValue as number;
	}

	async incrementThemeCounter(counter: number) {
		const counterName = 'themeCounter';

		if (counter === 0) {
			const params: PutCommandInput = {
				TableName: this.dbConstants.getTable('Counters'),
				Item: {
					PK: this.themePrimaryKey,
					SK: this.dbConstants.getSortKey(counterName),
					counterName: counterName,
					counterValue: '1',
				},
			};
			await this.dbService.putItem(params);
		} else {
			const params: UpdateItemCommandInput = {
				TableName: this.dbConstants.getTable('Counters'),
				Key: {
					PK: { S: this.themePrimaryKey },
					SK: { S: this.dbConstants.getSortKey(counterName) },
				},
				UpdateExpression: 'SET counterValue = :counterValue',
				ExpressionAttributeValues: {
					':counterValue': { N: (counter + 1).toString() },
				},
			};
			await this.dbService.updateItem(params);
		}
	}

	/**
	 * Create a new theme.
	 * 
	 * @param createThemeDto - The data for creating the theme.
	 * @returns The created theme.
	 */
	async createTheme(createThemeDto: CreateThemeDto) {
		
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const counter = await this.getNextCounterValueOfTheme();
		
		const uid = `${createThemeDto.organizationId}-${year}-${String(counter).padStart(2, '0')}`

		// Create the theme object
		const Item = {
			uid: uid,
			PK: this.themePrimaryKey,
			SK: this.dbConstants.getSortKey(uid),
			...createThemeDto,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};

		// Add the theme to the database
		const params: PutItemCommandInput = {
			TableName: this.themeTableName,
			Item: Item as Record<string, any>,
		};

		// Add the theme to the database
		await this.dbService.putItem(params);

		// Increment the counter for the theme
		await this.incrementThemeCounter(Number(counter));

		// Return the created theme
		return Item;
	}
	
	/**
	 * Find a theme by UID.
	 * 
	 * @param uid - The UID of the theme to find.
	 * @returns The theme found or null if not found.
	 */
	async findThemeByUid(uid: string) {
		// Query the theme by UID
		const params: QueryCommandInput = {
			TableName: this.themeTableName,
			IndexName: 'uidIndex',
			KeyConditionExpression: 'uid = :uid',
			ExpressionAttributeValues: {
				':uid': { S: uid },
			},
		};
	
		try {
			// Fetch the theme from the database
			const Items = await this.dbService.query(params);

			// Return the theme found or null if not found
			if (!Items || Items.length === 0) {
				return null;
			}
	
			// Return the theme found after mapping the DynamoDB item to a Theme object
			return this.dbService.mapDynamoDBItemToObject(Items[0]);
		} catch(_) {
			// Return null if an error occurs
			return null;
		}
	}

	/**
	 * Update an existing theme.
	 * 
	 * @param uid - The UID of the theme to update.
	 * @param updateThemeDto - The data for updating the theme.
	 * @returns The updated theme.
	 */
	async updateTheme(uid: string, updateThemeDto: UpdateThemeDto) {
		const theme = await this.findThemeByUid(uid);
	
		if (!theme) {
			throw new Error('themeDoesntExists');
		}
	
		const updateExpressionParts: string[] = [];
		const expressionAttributeNames: { [key: string]: string } = {};
		const expressionAttributeValues: { [key: string]: any } = {};
	
		const fieldsToUpdate = {
			groups: updateThemeDto.groups,
			description: updateThemeDto.description,
			startDate: updateThemeDto.startDate,
			endDate: updateThemeDto.endDate,
			updatedAt: Date.now().toString(),
		};
	
		for (const [key, value] of Object.entries(fieldsToUpdate)) {
			if (value !== undefined) {
				const attributeName = `#${key}`;
				const attributeValue = `:${key}`;
				updateExpressionParts.push(`${attributeName} = ${attributeValue}`);
				expressionAttributeNames[attributeName] = key;
				expressionAttributeValues[attributeValue] = this.dbService.convertToAttributeValue(value);
	
			}
		}

		const updateExpression = `SET ${updateExpressionParts.join(', ')}`;
	
		const params: UpdateItemCommandInput = {
			TableName: this.themeTableName,
			Key: {
				PK: { S: theme.PK },
				SK: { S: theme.SK },
			},
			UpdateExpression: updateExpression,
			ExpressionAttributeNames: expressionAttributeNames,
			ExpressionAttributeValues: expressionAttributeValues,
		};
	
		await this.dbService.updateItem(params);
	
		return { ...theme, ...updateThemeDto };
	}
	
	/**
	 * Delete an existing theme.
	 * 
	 * @param uid - The UID of the theme to delete.
	 */
	async deleteTheme(uid: string) {
		const theme = await this.findThemeByUid(uid);
	
		if (!theme) {
			throw new Error('themeDoesntExists');
		}
	
		const params: DeleteItemCommandInput = {
			TableName: this.themeTableName,
			Key: {
				PK: { S: theme.PK },
				SK: { S: theme.SK },
			},
		};
	
		await this.dbService.deleteItem(params);
	
		return { message: 'Theme deleted successfully' };
	}

	/**
	 * This method fetches all themes from the database.
	 * 
	 * @param page - The page number
	 * @param limit - The number of items per page
	 * @param name - The name of the theme
	 * @param year - The year of creation
	 * @returns The list of themes
	 */
	async getAllThemes(page: number, limit: number, name?: string, year?: number) {
		page = !page ? 1: page;
		limit = !limit ? 10: limit;
		const params: ScanCommandInput = {
			TableName: this.themeTableName,
			FilterExpression: '',
			ExpressionAttributeNames: {}, // Initialize as an empty object
			ExpressionAttributeValues: {}, // Initialize as an empty object
		};
	
		// Add filter expression for name
		if (name) {
			params.FilterExpression += 'contains(#name, :name)';
			params.ExpressionAttributeNames!['#name'] = 'name'; // Use non-null assertion
			params.ExpressionAttributeValues![':name'] = { S: name }; // Use non-null assertion
		}
	
		// Add filter expression for year based on createdAt timestamp
		if (year) {
			if (params.FilterExpression) {
				params.FilterExpression += ' AND ';
			}
			params.FilterExpression += '#createdAt BETWEEN :yearStart AND :yearEnd';
			params.ExpressionAttributeNames!['#createdAt'] = 'createdAt'; // Use non-null assertion
			
			const yearStart = new Date(year, 0, 1).getTime().toString(); // Jan 1st of the year
			const yearEnd = Date.now().toString(); // Current timestamp

			params.ExpressionAttributeValues![':yearStart'] = { N: yearStart }; // Use non-null assertion
			params.ExpressionAttributeValues![':yearEnd'] = { N: yearEnd }; // Use non-null assertion
		}
	
		// If no filters were set, remove the attributes to simplify the scan
		if (!params.FilterExpression) {
			delete params.FilterExpression;
			delete params.ExpressionAttributeNames; 
			delete params.ExpressionAttributeValues;
		}
	
		try {
			const Items = await this.dbService.scanItems(params);
			// Implement pagination
			const startIndex = (page - 1) * limit;
			const endIndex = page * limit;
			const paginatedItems = Items.slice(startIndex, endIndex);
	
			// Map each DynamoDB item to an Organization object
			return paginatedItems.map(item => this.dbService.mapDynamoDBItemToObject(item));
		} catch (error) {
			return [];
		}
	}
}