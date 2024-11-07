import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { PutCommandInput, ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { DbService } from 'src/global/db/db.service';
import { AbilityInterface } from "src/shared/constants/abilities";
import { UserRoles } from "../user/model/user.model";
import { DbConstants } from "src/global/db/db.constants";
import { DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";
import { AssignAbilityDto } from "src/modules/user/dto/assign-ability.dto";
import { UserService } from "../user/user.service";
import { DeassignAbilityDto } from "../user/dto/deassign-ability.dto";

/**
 * @module AbilityService
 * @description
 * This service is responsible for managing abilities in the system.
 * It provides methods to create, retrieve, delete, and seed abilities.
 */
@Injectable()
export class AbilityService {
	private readonly tableName: string;

	/**
	 * Constructor for the AbilityService.
	 * 
	 * @param dbService - The database service instance.
	 * @param dbConstants - The database constants.
	 * @param userService - The user service instance.
	 */
	constructor(
		private readonly dbService: DbService,
		private readonly dbConstants: DbConstants,
		@Inject(forwardRef(() => UserService)) // ForwardRef is used to avoid circular dependency
		private readonly userService: UserService,
	) {
		const table = 'Abilities'; // The table name
		this.tableName = dbConstants.getTable(table); // The full table name
	}

	/**
	 * Seeds abilities for a user based on their role and organization.
	 * 
	 * @param uid - The user's unique identifier.
	 * @param role - The user's role.
	 * @param organizationId - The organization's unique identifier.
	 */
	async seedAbilities(uid: string, role: UserRoles, organizationId: string) {
		// Initialize an empty array to store abilities
		const abilities: any[] = [];

		// Add abilities based on the user's role
		if (role === UserRoles.ORG_ADMIN) {
			if (!organizationId) {
				throw new Error('orgIdRequiredForOrgAdmin');
			}
			// Add ability to manage all users
			abilities.push({
				action: 'manage',
				subject: 'User',
			});
			abilities.push({
				action: 'manage',
				subject: 'Theme',
			});
		}
		// Add ability to read users
		else if (role === UserRoles.ORG_USER) {
			// Add ability to read users
			abilities.push({
				action: 'read',
				subject: 'User',
			});
		}
		// Add ability to read users
		else if (role == UserRoles.SYGAR_USER) {
			// Add ability to read users
			abilities.push({
				action: 'read',
				subject: 'User',
			});
		}

		// Store abilities in DynamoDB
		for (const ability of abilities) {
			// Create the identifier
			const identifier = `${uid}#${(ability.action.toUpperCase())}_${(ability.subject.toUpperCase())}`;
			// Create the params
			const params: PutCommandInput = {
				TableName: this.tableName,
				Item: {
					...ability,
					...{
						identifier: identifier,
						PK: this.tableName,
						SK: this.dbConstants.getSortKey(identifier),
						createdAt: Date.now(),
						updatedAt: Date.now(),
						organizationId: organizationId,
						userUid: uid,
					},
			}};
			// Store the ability in DynamoDB
			await this.dbService.putItem(params);
		}
	}

	/**
	 * Retrieves an ability by its identifier.
	 * 
	 * @param identifier - The identifier of the ability.
	 * @returns The ability if found, otherwise null.
	 */
	async getAbility(identifier: string): Promise<AbilityInterface | null> {
		// Create the params
		const params: ScanCommandInput = {
			TableName: this.tableName,
			FilterExpression: 'identifier = :identifier',
			ExpressionAttributeValues: {
				':identifier': { S: identifier },
			},
		};

		try {
			const Items = await this.dbService.scanItems(params);
			if (!Items || Items.length === 0) {
				return null;
			}
			return this.dbService.mapDynamoDBItemToObject(Items[0]) as AbilityInterface;
		} catch (_) {
			console.error('Error getting ability', _);
			return null;
		}
		
		
	}

	/**
	 * Retrieves all abilities for a user.
	 * 
	 * @param userUid - The user's unique identifier.
	 * @param organizationId - The organization's unique identifier.
	 * @returns An array of abilities.
	 */
	async getAbilities(userUid: string, organizationId: string | null) {
		// Create the params
		const params: ScanCommandInput = {
			TableName: this.tableName,
			FilterExpression: 
				organizationId ?
				'userUid = :userUid AND organizationId = :organizationId' :
				'userUid = :userUid',
			ExpressionAttributeValues: {
				':userUid': { S: userUid },
				...(organizationId && { ':organizationId': { S: organizationId } }),
			},
		};

		const abilities = await this.dbService.scanItems(params);

		return abilities;
	}

	/**
	 * Deassign an ability from the database.
	 * 
	 * @param ability - The ability to deassign.
	 */
	async deassignAbility(ability: AbilityInterface & { PK: string, SK: string }) {
		// Create the params
		const param: DeleteItemCommandInput = {
			TableName: this.tableName,
			Key: {
				PK: { S: ability.PK },
				SK: { S: ability.SK },
			},
		};

		await this.dbService.deleteItem(param);
	}


	/**
	 * Deletes an ability by its identifier.
	 * 
	 * @param deleteAbilityDto - The DTO containing the user's unique identifier and the ability type.
	 * @returns A message indicating the success of the operation.
	 */
	async deassignAbilityByUid(deleteAbilityDto: DeassignAbilityDto) {
		const ability = await this.getAbility(`${deleteAbilityDto.uid}#${deleteAbilityDto.abilityType}`);
		if (!ability) {
			throw new Error('abilityNotFound');
		}
		await this.deassignAbility(ability);
		return { message: 'Ability deleted successfully' };
	}


	/**
	 * Erases all abilities for a user.
	 * 
	 * @param userUid - The user's unique identifier.
	 */
	async eraseAbilities(userUid: string) {
		const abilities = await this.getAbilities(userUid, null);

		for (const ability of abilities) {
			await this.deassignAbility(this.dbService.mapDynamoDBItemToObject(ability));
		}
	}

	/**
	 * Creates a new ability for a user.
	 * 
	 * @param ability - The DTO containing the ability details.
	 * @returns The created ability.
	 */
	async createAbility(ability: AssignAbilityDto): Promise<AbilityInterface> {
		// Check if the user exists if not it will throw an error
		await this.userService.get(ability.uid);
		
		const identifier: string = `${ability.uid}#${ability.abilityType}`
		// Check if the ability already exists
		const existingAbility = await this.getAbility(identifier);

		if (existingAbility) {
			throw new Error('abilityExists');
		}

		// Create the ability
		if (!ability.abilityType) {
			throw new Error('abilityTypeRequired');
		}

		const abilityType = ability?.abilityType; // Use optional chaining to avoid errors

		if (!abilityType) {
			throw new Error('abilityTypeUndefined');
		}

		const [action, subject] = abilityType.split('_').map((item, index) => {
			if (index === 0) {
				return item.toLowerCase();
			} else if (index === 1) {
				return item.charAt(0).toUpperCase() + item.slice(1); // Capitalize the first letter
			}
		});
		console.debug('action:', action, 'subject:', subject);

		if (!action || !subject) {
			throw new Error('invalidAbilityType');
		}

		// Create the ability
		const newAbility: AbilityInterface = {
			PK: this.tableName,
			SK: this.dbConstants.getSortKey(identifier),
			identifier: identifier,
			action: action,
			subject: subject,
			userUid: ability.uid,
			organizationId: ability.organizationId,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};

		// Store the ability in DynamoDB
		const params: PutCommandInput = {
			TableName: this.tableName,
			Item: newAbility,
		};

		// Store the ability in DynamoDB
		await this.dbService.putItem(params);

		// Return the created ability
		return newAbility;
	}
}
