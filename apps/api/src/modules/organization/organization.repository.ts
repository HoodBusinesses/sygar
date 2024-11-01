import { Injectable } from "@nestjs/common";
import { DbConstants } from "src/global/db/db.constants";
import { DbService } from "src/global/db/db.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { PutCommandInput, QueryCommandInput, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { Organization } from "./model/organization.model";
import { v4 as uuid } from 'uuid';
import { DeleteItemCommandInput, PutItemCommandInput, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { UpdateThemeDto } from "./dto/update-theme.dto";
import { CreateAnimatorDto } from "./dto/create-animator.dto";
import { UpdateAnimatorDto } from "./dto/update-animator.dto";
import { Animator } from "./model/animator.model";
import { EnrolledType, GroupAction } from "./model/group.model";
import { Formator } from "./model/formator.model";
import { CreateFormatorDto } from "./dto/create-formator.dto";
import { UpdateFormatorDto } from "./dto/update-formator.dto";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { Participant } from "./model/participant.model";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { AssigningGroup } from "./model/assigning-group.model";
import { AssignToGroupDto } from "./dto/assign-group.dto";

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

/**
 * @module ThemeRepository
 * @description
 * This repository is responsible for managing themes in the database.
 */
@Injectable()
export class ThemeRepository {
	private readonly themeTableName: string; // The name of the theme table
	private readonly themePrimaryKey: string; // The primary key of the theme table

	/**
	 * Constructor for the ThemeRepository class.
	 * 
	 * @param dbService - The database service.
	 * @param dbConstants - The database constants.
	 */
	constructor(
		private readonly dbService: DbService,
		private readonly dbConstants: DbConstants,
	) {
		const themeTable = 'Themes';
		this.themeTableName = this.dbConstants.getTable(themeTable);
		this.themePrimaryKey = this.dbConstants.getPrimaryKey(themeTable);
	}

	/**
	 * This method fetches the next counter value for the theme.
	 * 
	 * @returns The next counter value for the theme.
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

	/**
	 * This method increments the theme counter.
	 * 
	 * @param counter - The counter value.
	 */
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
			params.FilterExpression += 'contains(lower(#name), lower(:name))';
			params.ExpressionAttributeNames!['#name'] = 'name'; // Use non-null assertion
			params.ExpressionAttributeValues![':name'] = { S: name.toLowerCase() }; // Use non-null assertion
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

/**
 * @class GroupRepository
 * @remarks
 * The repository uses the DbService to interact with the database.
 */
@Injectable()
export class GroupRepository {
	private readonly groupTableName: string; // The name of the table
	private readonly groupPrimaryKey: string; // The primary key of the table

	/**
	 * Constructor for the GroupRepository class.
	 * 
	 * @param dbConstants - The constants for the database.
	 * @param dbService - The service for database operations.
	 */
	constructor(
		private readonly dbConstants: DbConstants,
		private readonly dbService: DbService,
	) {
		const groupTable = 'Groups';
		this.groupTableName = this.dbConstants.getTable(groupTable);
		this.groupPrimaryKey = this.dbConstants.getPrimaryKey(groupTable);
	}

	/**
	 * Create a new group.
	 * 
	 * @param createGroupDto - The data for creating the group.
	 * @returns The created group.
	 */
	async createGroup(createGroupDto: CreateGroupDto) {
		const uid = uuid();

		const Item = {
			PK: this.groupPrimaryKey,
			SK: this.dbConstants.getSortKey(uid),
			uid,
			...createGroupDto,
			createdAt: Date.now(),
		};

		const params: PutItemCommandInput = {
			TableName: this.groupTableName,
			Item: Item as Record<string, any>
		};

		await this.dbService.putItem(params);

		return Item;
	}

	/**
	 * Get a group by UID.
	 * 
	 * @param uid - The UID of the group to get.
	 * @returns The group found or null if not found.
	 */
	async getByUid(uid: string) {
		if (!uid) {
			throw new Error('uidRequired');
		}

		const params: QueryCommandInput = {
			TableName: this.groupTableName,
			IndexName: 'UidIndex',
			KeyConditionExpression: 'uid = :uid',
			ExpressionAttributeValues: {
				':uid': { S: uid },
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

	/**
	 * Update an existing group.
	 * 
	 * @param uid - The UID of the group to update.
	 * @param updateGroupDto - The data for updating the group.
	 * @returns The updated group.
	 */
	async updateGroup(uid: string, updateGroupDto: UpdateGroupDto) {
		if (!uid) {
			throw new Error('uidRequired');
		}

		const group = await this.getByUid(uid);

		if (!group) {
			throw new Error('groupDoesntExists');
		}

		const updateExpressionParts: string[] = [];
		const expressionAttributeNames: { [key: string]: string } = {};
		const expressionAttributeValues: { [key: string]: any } = {};

		const fieldsToUpdate = {
			location: updateGroupDto.location,
			action: updateGroupDto.action,
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
			TableName: this.groupTableName,
			Key: {
				PK: { S: group.PK },
				SK: { S: group.SK },
			},
			UpdateExpression: updateExpression,
			ExpressionAttributeNames: expressionAttributeNames,
			ExpressionAttributeValues: expressionAttributeValues,
		};

		await this.dbService.updateItem(params);

		return {
			...group,
			location: updateGroupDto.location ?? group.location,
			action: updateGroupDto.action ?? group.action,
			updatedAt: fieldsToUpdate.updatedAt
		};
	}

	/**
	 * Delete an existing group.
	 * 
	 * @param uid - The UID of the group to delete.
	 */
	async deleteGroup(uid: string) {
		const group = await this.getByUid(uid);

		if (!group) {
			throw new Error('groupDoesntExists');
		}

		const params: DeleteItemCommandInput = {
			TableName: this.groupTableName,
			Key: {
				PK: { S: group.PK },
				SK: { S: group.SK },
			},
		};

		await this.dbService.deleteItem(params);

		return { message: 'Group deleted successfully' };
	}

	/**
	 * This method fetches all groups from the database.
	 * 
	 * @param page - The page number
	 * @param limit - The number of items per page
	 * @param themeId - The ID of the theme
	 * @param location - The location of the group
	 * @param action - The action of the group
	 * @returns The list of groups
	 */
	async getAllGroups(page: number, limit: number, themeId?: string, location?: string, action?: GroupAction) {
		page = !page ? 1 : page;
		limit = !limit ? 10 : limit;

		const params: ScanCommandInput = {
			TableName: this.groupTableName,
			FilterExpression: '',
			ExpressionAttributeNames: {},
			ExpressionAttributeValues: {},
		};

		if (themeId) {
			params.FilterExpression += 'themeId = :themeId';
			params.ExpressionAttributeValues![':themeId'] = { S: themeId };
		}

		if (location) {
			if (params.FilterExpression) {
				params.FilterExpression += ' AND ';
			}
			params.FilterExpression += 'location = :location';
			params.ExpressionAttributeValues![':location'] = { S: location };
		}

		if (action) {
			if (params.FilterExpression) {
				params.FilterExpression += ' AND ';
			}
			params.FilterExpression += 'action = :action';
			params.ExpressionAttributeValues![':action'] = { S: action };
		}

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

			return paginatedItems.map(item => this.dbService.mapDynamoDBItemToObject(item));
		} catch (error) {
			return [];
		}

	}
}

/**
 * @class AnimatorRepository
 * @remarks
 * The repository uses the DbService to interact with the database.
 */
@Injectable()
export class AnimatorRepository {
	private readonly animatorTableName: string;
	private readonly animatorPrimaryKey: string;

	/**
	 * Constructor for the AnimatorRepository class.
	 * 
	 * @param dbConstants - The constants for the database.
	 * @param dbService - The service for database operations.
	 */
	constructor(
		private readonly dbConstants: DbConstants,
		private readonly dbService: DbService,
	) {
		const animatorTable = 'Animators';
		this.animatorTableName = this.dbConstants.getTable(animatorTable);
		this.animatorPrimaryKey = this.dbConstants.getPrimaryKey(animatorTable);
	}

	/**
	 * Create a new animator.
	 * 
	 * @param createAnimatorDto - The data for creating the animator.
	 * @returns The created animator.
	 */
	async createAnimator(createAnimatorDto: CreateAnimatorDto) {
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

	/**
	 * Get an animator by email.
	 * 
	 * @param email - The email of the animator to get.
	 * @returns The animator found or null if not found.
	 */
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

	/**
	 * Get an animator by UID.
	 * 
	 * @param uid - The UID of the animator to get.
	 * @returns The animator found or null if not found.
	 */
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

	/**
	 * Update an existing animator.
	 * 
	 * @param updateAnimatorDto - The data for updating the animator.
	 * @param uid - The UID of the animator to update.
	 * @returns The updated animator.
	 */
	async updateAnimator(updateAnimatorDto: UpdateAnimatorDto, uid: string): Promise <Animator> {
		const animator: Animator | null = await this.getByUid(uid);

		if (!animator) {
			throw new Error('animatorDoesntExists');
		} 

		const updateExpressionParts: string[] = [];
		const expressionAttributeNames: { [key: string]: string } = {};
		const expressionAttributeValues: { [key: string]: any } = {};

		for (const [key, value] of Object.entries(updateAnimatorDto)) {
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

	/**
	 * Delete an existing animator.
	 * 
	 * @param uid - The UID of the animator to delete.
	 */
	async deleteAnimator(uid: string) {
		const animator = await this.getByUid(uid);

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

		return { message: 'Animator deleted successfully' };
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
export class AssigningGroupRepository {
	private readonly assigningGroupTableName: string;
	private readonly assigningGroupPrimaryKey: string;

	/**
	 * Constructor for the AssigningGroupRepository class.
	 * 
	 * @param dbConstants - The constants for the database.
	 * @param dbService - The service for database operations.
	 * @param groupRepository - The repository for the group.
	 */
	constructor(
		private readonly dbConstants: DbConstants,
		private readonly dbService: DbService,
		private readonly groupRepository: GroupRepository,
	) {
		this.assigningGroupTableName = this.dbConstants.getTable('AssigningGroups');
		this.assigningGroupPrimaryKey = this.dbConstants.getPrimaryKey('AssigningGroups');
	}

	/**
	 * Create a new assigning group.
	 * 
	 * @param assignToGroupDto - The data for creating the assigning group.
	 * @returns The created assigning group.
	 */
	async createAssigningGroup(assignToGroupDto: AssignToGroupDto) {
		const group = await this.groupRepository.getByUid(assignToGroupDto.groupUid);
		if (!group) {
			throw new Error('groupDoesntExists');
		}

		const uid = uuid();

		const Item: AssigningGroup = {
			PK: this.assigningGroupPrimaryKey,
			SK: this.dbConstants.getSortKey(uid),
			uid,
			themeId: group.themeId,
			organizationId: group.organizationId,
			startDate: group.startDate,
			endDate: group.endDate,
			...assignToGroupDto,
			createdAt: Date.now(),
		}

		const params: PutCommandInput = {
			TableName: this.assigningGroupTableName,
			Item: Item as Record<string, any>,
		};

		await this.dbService.putItem(params);

		return Item;
	}

	/**
	 * Get an assigning group by UID.
	 * 
	 * @param uid - The UID of the assigning group to get.
	 * @returns The assigning group found or null if not found.
	 */
	async getByUid(uid: string): Promise<AssigningGroup | null> {
		const params: QueryCommandInput = {
			TableName: this.assigningGroupTableName,
			IndexName: 'UidIndex',
			KeyConditionExpression: 'uid = :uid',
			ExpressionAttributeValues: {
				':uid': { S: uid },
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

	/**
	 * Get an assigning group by enrolled UID and enrolled type.
	 * 
	 * @param enrolledUid - The UID of the enrolled to get.
	 * @param enrolledType - The type of the enrolled.
	 * @returns The assigning group found or null if not found.
	 */
	async getByEnrolleds(enrolledUid: string, enrolledType: EnrolledType): Promise<AssigningGroup[]> {
		const params: QueryCommandInput = {
			TableName: this.assigningGroupTableName,
			IndexName: 'EnrolledIndex',
			KeyConditionExpression: 'enrolledUid = :enrolledUid AND enrolledType = :enrolledType',
			ExpressionAttributeValues: {
				':enrolledUid': { S: enrolledUid },
				':enrolledType': { S: enrolledType },
			}
		};

		try {
			const Items = await this.dbService.query(params);
			return Items.map((item: Record<string, any>) => this.dbService.mapDynamoDBItemToObject(item));
		} catch (error) {
			return [];
		}
	}

	/**
	 * Get an assigning group by group UID and enrolled type.
	 * 
	 * @param groupUid - The UID of the group.
	 * @param enrolledType - The type of the enrolled.
	 * @returns The assigning group found or null if not found.
	 */
	async getByGroupUid(groupUid: string, enrolledType: EnrolledType): Promise<AssigningGroup[]> {
		const params: QueryCommandInput = {
			TableName: this.assigningGroupTableName,
			KeyConditionExpression: 'groupUid = :groupUid AND enrolledType = :enrolledType',
			ExpressionAttributeValues: {
				':groupUid': { S: groupUid },
				':enrolledType': { S: enrolledType },
			}
		};

		try {
			const Items = await this.dbService.query(params);

			return Items.map((item: Record<string, any>) => this.dbService.mapDynamoDBItemToObject(item));
		} catch (error) {
			return [];
		}
	}

	/**
	 * Delete an existing assigning group.
	 * 
	 * @param uid - The UID of the assigning group to delete.
	 */
	async deleteAssigningGroup(uid: string) {
		const assigningGroup = await this.getByUid(uid);
		if (!assigningGroup) {
			throw new Error('assigningGroupDoesntExists');
		}

		const params: DeleteItemCommandInput = {
			TableName: this.assigningGroupTableName,
			Key: {
				PK: { S: assigningGroup.PK },
				SK: { S: assigningGroup.SK },
			},
		};

		await this.dbService.deleteItem(params);

		return { message: 'Assigning group deleted successfully' };
	}
}


@Injectable()
export class FormatorRepository {
	private readonly formatorTableName: string;
	private readonly formatorPrimaryKey: string;

	/**
	 * Constructor for the FormatorRepository class.
	 * 
	 * @param dbConstants - The constants for the database.
	 * @param dbService - The service for database operations.
	 */
	constructor(
		private readonly dbConstants: DbConstants,
		private readonly dbService: DbService,
	) {
		this.formatorTableName = this.dbConstants.getTable('Formators');
		this.formatorPrimaryKey = this.dbConstants.getPrimaryKey('Formators');
	}

	/**
	 * Create a new formator.
	 * 
	 * @param createFormatorDto - The data for creating the formator.
	 * @returns The created formator.
	 */
	async createFormator(createFormatorDto: CreateFormatorDto) {
		const uid = uuid();
		const Item: Formator = {
			PK: this.formatorPrimaryKey,
			SK: this.dbConstants.getSortKey(uid),
			uid,
			...createFormatorDto,
			createdAt: Date.now(),
		};

		const params: PutCommandInput = {
			TableName: this.formatorTableName,
			Item: Item as Record<string, any>,
		};

		await this.dbService.putItem(params);

		return Item;
	}

	/**
	 * Get a formator by email.
	 * 
	 * @param email - The email of the formator.
	 * @returns The formator found or null if not found.
	 */
	async getByEmail(email: string): Promise<Formator | null> {
		const params: QueryCommandInput = {
			TableName: this.formatorTableName,
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

	/**
	 * Get a formator by UID.
	 * 
	 * @param uid - The UID of the formator.
	 * @returns The formator found or null if not found.
	 */
	async getByUid(uid: string): Promise<Formator | null> {
		const params: QueryCommandInput = {
			TableName: this.formatorTableName,
			KeyConditionExpression: 'PK = :PK AND SK = :SK',
			ExpressionAttributeValues: {
				':PK': { S: this.formatorPrimaryKey },
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

	/**
	 * Update a formator
	 * @param updateFormatorDto - The data for updating the formator
	 * @param uid - The UID of the formator to update
	 * @returns The formator updated
	 */
	async updateFormator(updateFormatorDto: UpdateFormatorDto, uid: string): Promise<Formator> {
		const formator = await this.getByUid(uid);
		if (!formator) {
			throw new Error('formatorDoesntExists');
		}

		const updateExpressionParts: string[] = [];
		const expressionAttributeNames: { [key: string]: string } = {};
		const expressionAttributeValues: { [key: string]: any } = {};

		for (const [key, value] of Object.entries(updateFormatorDto)) {
			if (value !== undefined) {
				const attributeName = `#${key}`;
				const attributeValue = `:${key}`;
				updateExpressionParts.push(`${attributeName} = ${attributeValue}`);
				expressionAttributeNames[attributeName] = key;
				expressionAttributeValues[attributeValue] = this.dbService.convertToAttributeValue(value);
			}
		}

		const updateExpression = 'SET ' + updateExpressionParts.join(', ');

		const params: UpdateItemCommandInput = {
			TableName: this.formatorTableName,
			Key: {
				PK: { S: formator.PK },
				SK: { S: formator.SK },
			},
			UpdateExpression: updateExpression,
			ExpressionAttributeNames: expressionAttributeNames,
			ExpressionAttributeValues: expressionAttributeValues,
		};

		await this.dbService.updateItem(params);

		return { ...formator, ...updateFormatorDto };
	}

	/**
	 * Delete an existing formator.
	 * 
	 * @param uid - The UID of the formator to delete.
	 */
	async deleteFormator(uid: string) {
		const formator = await this.getByUid(uid);
		if (!formator) {
			throw new Error('formatorDoesntExists');
		}

		const params: DeleteItemCommandInput = {
			TableName: this.formatorTableName,
			Key: {
				PK: { S: formator.PK },
				SK: { S: formator.SK },
			},
		};

		await this.dbService.deleteItem(params);

		return { message: 'Formator deleted successfully' };
	}
}

@Injectable()
export class ParticipantRepository {
	private readonly participantTableName: string;
	private readonly participantPrimaryKey: string;

	/**
	 * Constructor for the ParticipantRepository class.
	 * 
	 * @param dbConstants - The constants for the database.
	 * @param dbService - The service for database operations.
	 */
	constructor(
		private readonly dbConstants: DbConstants,
		private readonly dbService: DbService,
	) {
		this.participantTableName = this.dbConstants.getTable('Participants');
		this.participantPrimaryKey = this.dbConstants.getPrimaryKey('Participants');
	}

	/**
	 * Create a new participant.
	 * 
	 * @param createParticipantDto - The data for creating the participant.
	 * @returns The created participant.
	 */
	async createParticipant(createParticipantDto: CreateParticipantDto) {
		const uid = uuid();
		const Item: Participant = {
			PK: this.participantPrimaryKey,
			SK: this.dbConstants.getSortKey(uid),
			uid,
			...createParticipantDto,
			createdAt: Date.now(),
		};

		const params: PutCommandInput = {
			TableName: this.participantTableName,
			Item: Item as Record<string, any>,
		};

		await this.dbService.putItem(params);

		return Item;
	}

	/**
	 * Get a participant by email.
	 * 
	 * @param email - The email of the participant.
	 * @returns The participant found or null if not found.
	 */
	async getByEmail(email: string): Promise<Participant | null> {
		const params: QueryCommandInput = {
			TableName: this.participantTableName,
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

	/**
	 * Get a participant by UID.
	 * 
	 * @param uid - The UID of the participant.
	 * @returns The participant found or null if not found.
	 */
	async getByUid(uid: string): Promise<Participant | null> {
		const params: QueryCommandInput = {
			TableName: this.participantTableName,
			KeyConditionExpression: 'PK = :PK AND SK = :SK',
			ExpressionAttributeValues: {
				':PK': { S: this.participantPrimaryKey },
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

	/**
	 * Get a participant by CNSS.
	 * 
	 * @param cnss - The CNSS of the participant.
	 * @returns The participant found or null if not found.
	 */
	async getByCnss(cnss: string): Promise<Participant | null> {
		const params: QueryCommandInput = {
			TableName: this.participantTableName,
			IndexName: 'CnssIndex',
			KeyConditionExpression: 'cnss = :cnss',
			ExpressionAttributeValues: {
				':cnss': { S: cnss },
			}
		};

		const Items = await this.dbService.query(params);

		if (!Items || Items.length === 0) {
			return null;
		}

		return this.dbService.mapDynamoDBItemToObject(Items[0]);
	}

	/**
	 * Update a participant
	 * @param updateParticipantDto - The data for updating the participant
	 * @param uid - The UID of the participant to update
	 * @returns The participant updated
	 */
	async updateParticipant(updateParticipantDto: UpdateParticipantDto, uid: string): Promise<Participant> {
		const participant = await this.getByUid(uid);

		if (!participant) {
			throw new Error('participantDoesntExists');
		}

		const updateExpressionParts: string[] = [];
		const expressionAttributeNames: { [key: string]: string } = {};
		const expressionAttributeValues: { [key: string]: any } = {};

		const fieldsToUpdate = {
			firstName: updateParticipantDto.firstName,
			lastName: updateParticipantDto.lastName,
			email: updateParticipantDto.email,
			status: updateParticipantDto.status,
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

		const updateExpression = 'SET ' + updateExpressionParts.join(', ');

		const params: UpdateItemCommandInput = {
			TableName: this.participantTableName,
			Key: {
				PK: { S: participant.PK },
				SK: { S: participant.SK },
			},
			UpdateExpression: updateExpression,
			ExpressionAttributeNames: expressionAttributeNames,
			ExpressionAttributeValues: expressionAttributeValues,
		};

		await this.dbService.updateItem(params);

		return { ...participant, ...updateParticipantDto };
	} 

	/**
	 * Delete a participant
	 * @param uid - The UID of the participant to delete
	 * @returns The participant deleted
	 */
	async deleteParticipant(uid: string) {
		const participant = await this.getByUid(uid);

		if (!participant) {
			throw new Error('participantDoesntExists');
		}

		const params: DeleteItemCommandInput = {
			TableName: this.participantTableName,
			Key: {
				PK: { S: participant.PK },
				SK: { S: participant.SK },
			},
		};

		await this.dbService.deleteItem(params);

		return { message: 'Participant deleted successfully' };
	}

	/**
	 * Get all participants
	 * @param page - The page number
	 * @param limit - The number of items per page
	 * @param name - The name of the participant
	 * @returns The list of participants
	 */
	async getAllParticipants(page: number, limit: number, name?: string) {
		page = !page ? 1 : page;
		limit = !limit ? 10 : limit;
		const params: ScanCommandInput = {
			TableName: this.participantTableName,
			FilterExpression: '',
			ExpressionAttributeNames: {},
			ExpressionAttributeValues: {},
		};

		if (name) {
			params.FilterExpression += 'contains(#name, :name)';
			params.ExpressionAttributeNames!['#name'] = 'name';
			params.ExpressionAttributeValues![':name'] = { S: name };
		}

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
