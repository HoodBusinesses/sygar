import { Injectable } from "@nestjs/common";
import { DbConstants } from "src/global/db/db.constants";
import { DbService } from "src/global/db/db.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { DeleteCommandInput, PutCommandInput, QueryCommandInput, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { Organization } from "./model/organization.model";
import { v4 as uuid } from 'uuid';
import { DeleteItemCommandInput, PutItemCommandInput, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { CreateAnimatorItemDto, UpdateAnimatorDto } from "./dto/create-animator.dto";
import { Animator } from "./model/animator.model";
import { CreateWorkingTimeDto, UpdateWorkingTimeDto, WorkTimeLimit } from "./model/group.model";
import { WorkerType, WorkingTime } from "./model/working-time.model";
import { CreateFormatorDto, CreateFormatorItem, Formator } from "./model/formator.model";

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
}

@Injectable()
export class ThemeRepository {
	private readonly themeTableName: string;
	private readonly themePrimaryKey: string;
	constructor(
		private readonly dbService: DbService,
		private readonly dbConstants: DbConstants,
	) {
		const themeTable = 'Themes';
		this.themeTableName = this.dbConstants.getTable(themeTable);
		this.themePrimaryKey = this.dbConstants.getPrimaryKey(themeTable);
	}

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

@Injectable()
export class AnimatorRepository {
	private readonly animatorTableName: string;
	private readonly animatorPrimaryKey: string;

	constructor(
		private readonly dbConstants: DbConstants,
		private readonly dbService: DbService,
	) {
		const animatorTable = 'Animators';
		this.animatorTableName = this.dbConstants.getTable(animatorTable);
		this.animatorPrimaryKey = this.dbConstants.getPrimaryKey(animatorTable);
	}
	async createAnimator(createAnimatorDto: CreateAnimatorItemDto) {
		const uid = uuid();
		const Item = {
			PK: this.animatorPrimaryKey,
			SK: this.dbConstants.getSortKey(uid),
			uid,
			...createAnimatorDto,
			createdAt: Date.now(),
		};

		const params: PutItemCommandInput = {
			TableName: this.animatorTableName,
			Item: Item as Record<string, any>
		};

		await this.dbService.putItem(params);

		return Item;
	}

	async getByEmail(email: string): Promise<Animator | null> {
		const params: QueryCommandInput = {
			TableName: this.animatorTableName,
			IndexName: 'EmailIndex',
			KeyConditionExpression: 'email = :email',
			ExpressionAttributeValues: {
				':email': { S: email },
			}
		};

		try {
			const Items = await this.dbService.query(params);
			
			if (!Items || Items.length === 0) {
				return null;
			}

			return this.dbService.mapDynamoDBItemToObject(Items[0]) as Animator;
		} catch (error) {
			return null;
		}
	}

	async getByUid(uid: string): Promise<Animator | null> {
		const params: QueryCommandInput = {
			TableName: this.animatorTableName,
			KeyConditionExpression: 'PK = :PK AND SK = :SK',
			ExpressionAttributeValues: {
				':PK': { S: this.dbConstants.getPrimaryKey('Animators') },
				':SK': { S: this.dbConstants.getSortKey(uid) },
			}
		};

		try {
			const Items = await this.dbService.query(params);

			if (!Items || Items.length === 0) {
				return null;
			}

			return this.dbService.mapDynamoDBItemToObject(Items[0]);
		} catch (error) {
			return null;
		}
	}

	async updateAnimator(updateAnimatorDto: UpdateAnimatorDto, uid: string): Promise <Animator | null> {
		const animator: Animator | null = await this.getByUid(uid);

		if (!animator) {
			throw new Error('animatorDoesntExists');
		} 

		const updateExpressionParts: string[] = [];
		const expressionAttributeNames: { [key: string]: string } = {};
		const expressionAttributeValues: { [key: string]: any } = {};

		const fieldsToUpdate = {
			name: updateAnimatorDto.name,
			workingHours: updateAnimatorDto.workingHours,
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
			TableName: this.animatorTableName,
			Key: {
				PK: { S: animator.PK },
				SK: { S: animator.SK },
			},
			UpdateExpression: updateExpression,
			ExpressionAttributeNames: expressionAttributeNames,
			ExpressionAttributeValues: expressionAttributeValues,
		};

		await this.dbService.updateItem(params);

		return { ...animator, ...updateAnimatorDto };

	}

	async deleteAnimator(email: string) {
		const animator = await this.getByEmail(email);

		if (!animator) {
			throw new Error('animatorDoesntExists');
		}

		const params: DeleteItemCommandInput = {
			TableName: this.animatorTableName,
			Key: {
				PK: { S: animator.PK },
				SK: { S: animator.SK },
			},
		};

		await this.dbService.deleteItem(params);

		return { message: 'Theme deleted successfully' };
	}

	/**
	 * This method fetches all animators from the database.
	 * 
	 * @param page - The page number
	 * @param limit - The number of items per page
	 * @param name - The name of the animator
	 * @returns The list of animators
	 */
	async getAllAnimators(page: number, limit: number, name?: string) {
		page = !page ? 1 : page;
		limit = !limit ? 10 : limit;
		const params: ScanCommandInput = {
			TableName: this.animatorTableName,
			FilterExpression: '',
			ExpressionAttributeNames: {},
			ExpressionAttributeValues: {},
		};

		// Add filter expression for name
		if (name) {
			params.FilterExpression += 'contains(#name, :name)';
			params.ExpressionAttributeNames!['#name'] = 'name';
			params.ExpressionAttributeValues![':name'] = { S: name };
		}

		// If no filters were set, remove the attributes to simplify the scan
		if (!params.FilterExpression) {
			delete params.FilterExpression;
			delete params.ExpressionAttributeNames;
			delete params.ExpressionAttributeValues;
		}

		const Items = await this.dbService.scanItems(params);

		// Apply pagination
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		const paginatedItems = Items.slice(startIndex, endIndex);

		return {
			items: paginatedItems.map((item: Record<string, any>) => this.dbService.mapDynamoDBItemToObject(item)),
			total: Items.length,
			page,
			limit,
		};
	}
}



@Injectable()
export class WorkingHoursManager {
	constructor(
		private readonly dbService: DbService,
		private readonly dbConstants: DbConstants,
		private readonly animatorRepository: AnimatorRepository,
	) {}

	async validateWorkingHours(workingHoursToValidate: CreateWorkingTimeDto[], email: string) {
		// get the working hours from the database of the worker to check it against the new working hours
		const workingHours = await this.getWorkingHours(email);

		// check if the given working hours are valid
		for (const workingHour of workingHoursToValidate) {
			if (workingHour.startTime > workingHour.endTime || workingHour.startTime < WorkTimeLimit.MINSTART || workingHour.endTime > WorkTimeLimit.MAXEND) {
				throw new Error('workingHoursInvalid');
			}
		}
			
		// check if there is any overlapping between the new working hours and the existing working hours
		for (const workingHour of workingHoursToValidate) {
			for (const existingWorkingHour of workingHours) {
				if (workingHour.day === existingWorkingHour.day && workingHour.startTime < existingWorkingHour.endTime && workingHour.endTime > existingWorkingHour.startTime) {
					throw new Error('workingHoursOverlapping');
				}
			}
		}

		// check if there is any overlapping between the new working hours themselves
		const hasOverlap = workingHoursToValidate.some((currentHour, index) => 
			workingHoursToValidate.slice(index + 1).some(nextHour => 
				currentHour.day === nextHour.day && 
				currentHour.startTime < nextHour.endTime && 
				currentHour.endTime > nextHour.startTime
			)
		);

		if (hasOverlap) {
			throw new Error('workingHoursOverlapping');
		}
	}

	async getWorkingHours(email: string): Promise<WorkingTime[]> {
		const params: QueryCommandInput = {
			TableName: this.dbConstants.getTable('WorkingTimes'),
			IndexName: 'EmailIndex',
			KeyConditionExpression: 'email = :email',
			ExpressionAttributeValues: {
				':email': { S: email },
			}
		};

		const Items = await this.dbService.query(params);

		return Items.map((item: Record<string, any>) => this.dbService.mapDynamoDBItemToObject(item));
	}

	async addWorkingHours(workingHours: CreateWorkingTimeDto[], email: string) {
		const animator = await this.animatorRepository.getByEmail(email);
		if (!animator) {
			throw new Error('animatorDoesntExists');
		}
		
		// we must check if the working hours are valid and not overlapping
		await this.validateWorkingHours(workingHours, email);


		// set the new working hours
		for (const workingHour of workingHours) {
			const uid = uuid();
			// check if the worker exists
			const workingTimeItem = {
				PK: this.dbConstants.getPrimaryKey('WorkingTimes'),
				SK: this.dbConstants.getSortKey(uid),
				uid,
				email,
				workerType: WorkerType.Animators,
				day: workingHour.day,
				startTime: workingHour.startTime,
				endTime: workingHour.endTime,
				createdAt: Date.now()
			};

			const params: PutCommandInput = {
				TableName: this.dbConstants.getTable('WorkingTimes'),
				Item: workingTimeItem
			};

			await this.dbService.putItem(params);
			}

		return { message: 'Working hours added successfully' };
	}

	async getWorkingHoursByUid(uid: string): Promise<WorkingTime | null> {
		const params: QueryCommandInput = {
			TableName: this.dbConstants.getTable('WorkingTimes'),
			IndexName: 'UidIndex',
			KeyConditionExpression: 'uid = :uid',
			ExpressionAttributeValues: {
				':uid': { S: uid },
			}
		};

		const Items = await this.dbService.query(params);

		if (!Items || Items.length === 0) {
			return null;
		}

		return this.dbService.mapDynamoDBItemToObject(Items[0]);
	}

	async deleteWorkingHours(uid: string) {
		// check if the working time exists
		const workingTime = await this.getWorkingHoursByUid(uid);
		if (!workingTime) {
			throw new Error('workingTimeDoesntExists');
		}

		const params: DeleteItemCommandInput = {
			TableName: this.dbConstants.getTable('WorkingTimes'),
			Key: {
				PK: { S: workingTime.PK },
				SK: { S: workingTime.SK },
			},
		};

		await this.dbService.deleteItem(params);

		return { message: 'Working hours deleted successfully' };
	}

	async getAllWorkingHours(email: string, groupUid: string, workerType: WorkerType, page: number, limit: number) {
		page = !page ? 1 : page;
		limit = !limit ? 10 : limit;

		const params: ScanCommandInput = {
			TableName: this.dbConstants.getTable('WorkingTimes'),
			FilterExpression: '',
			ExpressionAttributeNames: {},
			ExpressionAttributeValues: {},
		};

		if (email) {
			params.FilterExpression += 'email = :email';
			params.ExpressionAttributeValues![':email'] = { S: email };
		}

		if (groupUid) {
			params.FilterExpression += 'groupUid = :groupUid';
			params.ExpressionAttributeValues![':groupUid'] = { S: groupUid };
		}

		if (workerType) {
			params.FilterExpression += 'workerType = :workerType';
			params.ExpressionAttributeValues![':workerType'] = { S: workerType };
		}

		// If no filters were set, remove the attributes to simplify the scan
		if (!params.FilterExpression) {
			delete params.FilterExpression;
			delete params.ExpressionAttributeNames;
			delete params.ExpressionAttributeValues;
		}

		const Items = await this.dbService.scanItems(params);

		// Apply pagination
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		const paginatedItems = Items.slice(startIndex, endIndex);

		return {
			items: paginatedItems.map((item: Record<string, any>) => this.dbService.mapDynamoDBItemToObject(item)),
			total: Items.length,
			page,
			limit,
		};
	}

	async updateWorkingHours(updateWorkingTimeDto: UpdateWorkingTimeDto, uid: string) {
		// check if the working time exists
		const workingTime = await this.getWorkingHoursByUid(uid);
		if (!workingTime) {
			throw new Error('workingTimeDoesntExists');
		}

		// check if the new working hours are valid and not overlapping
		await this.validateWorkingHours([updateWorkingTimeDto as CreateWorkingTimeDto], workingTime.email);

		// update the working hours
		let expressionAttributeNames: { [key: string]: string } = {};
		let expressionAttributeValues: { [key: string]: any } = {};

		// get all keys from the updateWorkingTimeDto object and dynamically create the update expression
		const updateParts: string[] = [];
		Object.keys(updateWorkingTimeDto).forEach((key) => {
			if (updateWorkingTimeDto[key as keyof UpdateWorkingTimeDto] !== undefined) {
				updateParts.push(`#${key} = :${key}`);
				expressionAttributeNames[`#${key}`] = key;
				expressionAttributeValues[`:${key}`] = this.dbService.convertToAttributeValue(updateWorkingTimeDto[key as keyof UpdateWorkingTimeDto]);
			}
		});

		const updateExpression = 'SET ' + updateParts.join(', ');

		const params: UpdateItemCommandInput = {
			TableName: this.dbConstants.getTable('WorkingTimes'),
			Key: {
				PK: { S: workingTime.PK },
				SK: { S: workingTime.SK },
			},
			UpdateExpression: updateExpression,
			ExpressionAttributeNames: expressionAttributeNames,
			ExpressionAttributeValues: expressionAttributeValues,
		};

		await this.dbService.updateItem(params);

		return { message: 'Working hours updated successfully' };
	}
}

@Injectable()
export class FormatorRepository {
	constructor(
		private readonly dbConstants: DbConstants,
		private readonly dbService: DbService,
	) {}

	async createFormator(createFormatorDto: CreateFormatorItem) {
		const uid = uuid();
		const Item: Formator = {
			PK: this.dbConstants.getPrimaryKey('Formators'),
			SK: this.dbConstants.getSortKey(uid),
			uid,
			...createFormatorDto,
			createdAt: Date.now(),
		};

		const params: PutCommandInput = {
			TableName: this.dbConstants.getTable('Formators'),
			Item: Item as Record<string, any>,
		};

		await this.dbService.putItem(params);

		return Item;
	}

	async getByEmail(email: string): Promise<Formator | null> {
		const params: QueryCommandInput = {
			TableName: this.dbConstants.getTable('Formators'),
			IndexName: 'EmailIndex',
			KeyConditionExpression: 'email = :email',
			ExpressionAttributeValues: {
				':email': { S: email },
			}
		};

		const Items = await this.dbService.query(params);

		if (!Items || Items.length === 0) {
			return null;
		}

		return this.dbService.mapDynamoDBItemToObject(Items[0]);
	}
}
