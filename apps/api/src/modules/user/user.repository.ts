import { Injectable } from '@nestjs/common';
import { DbConstants } from 'src/global/db/db.constants';
import { DbService } from 'src/global/db/db.service';
import { User, UserRoles } from './model/user.model';
import {
  PutCommandInput,
  QueryCommandInput,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import {
  DeleteItemCommandInput,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { CryptService } from 'src/global/auth/crypt.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilityService } from '../ability/abiliry.service';
import { AdminsService } from '../admins/admins.service';

/**
 * @class UserRepository
 * @description
 * This class is responsible for managing users in the database.
 */
@Injectable()
export class UserRepository {
  private readonly tableName: string;

  /**
   * @constructor
   * @description
   * This constructor is used to initialize the userRepository class.
   * It takes in the dbService, dbConstants, cryptService, abilityService, adminsService and adminsService.
   * It also takes in the tableName.
   */
  constructor(
    private readonly dbService: DbService,
    private readonly dbConstants: DbConstants,
    private readonly cryptService: CryptService,
    private readonly abilityService: AbilityService,
    private readonly adminsService: AdminsService
  ) {
    const table = 'Users'; // The table name
    this.tableName = dbConstants.getTable(table); // The full table name
  }

  /**
   * @method create
   * @description
   * This method is used to create a new user.
   * It takes in the user to create.
   * It returns the created user.
   */
  async create(user: CreateUserDto): Promise<User> {
    // Create the user
    const uid = uuid();
    const newUser: User = {
      ...user,
      uid,
      password: null,
      PK: this.dbConstants.getPrimaryKey('Users'),
      SK: this.dbConstants.getSortKey(uid),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: false,
    };

    // Add the user to the database
    const putParams: PutCommandInput = {
      TableName: this.tableName,
      Item: newUser,
    };

    // Put the user in the database
    await this.dbService.putItem(putParams);

    // Seed the abilities for the user
    try {
      await this.abilityService.seedAbilities(
        uid,
        user.role,
        user.organizationId
      );
    } catch (error) {
      // Delete the user if the abilities could not be seeded
      await this.delete(user.email);
      throw new Error('Error seeding abilities');
    }

    // Create the admin if the user is an organization admin
    if (user.role === UserRoles.ORG_ADMIN) {
      await this.adminsService.create(newUser.uid, newUser.organizationId);
    }

    // Return the created user
    return {
      uid: newUser.uid,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      email: newUser.email,
      cnss: newUser.cnss,
      isActive: newUser.isActive,
    } as User;
  }

  /**
   * @method update
   * @description
   * This method is used to update a user.
   * It takes in the user to update.
   * It returns the updated user.
   */
  async update(user: UpdateUserDto): Promise<User> {
    // Find the user by uid
    const existingUser = await this.findByUid(user.uid);

    if (!existingUser) {
      throw new Error('User does not exist');
    }

    // Create the update expression
    const expressionAttributeNames: any = {}; // The expression attribute names
    const dxpressionAttributeValues: any = {}; // The expression attribute values
    let updateExpression = 'SET '; // The update expression
    let removeExpression = 'REMOVE '; // The remove expression
    let finalExpression = ''; // The final expression

    // Get all keys from the user object and dynamically create the update expression
    Object.keys(user).forEach((key) => {
      // Skip the uid field
      if (key !== 'uid' && user[key]) {
        // Add the field to the update expression
        updateExpression += `#${key} = :${key}, `;
        // Add the field to the expression attribute names
        expressionAttributeNames[`#${key}`] = key;
        // Add the field to the expression attribute values
        dxpressionAttributeValues[`:${key}`] = this.getDynamoDBAttributeValue(
          user[key]
        );
      } else if (user[key] === null) {
        removeExpression += `#${key}, `;
        expressionAttributeNames[`#${key}`] = key;
      }
    });

    // Add the updatedAt field to the update expression
    updateExpression += '#updatedAt = :updatedAt';
    // Add the updatedAt field to the expression attribute names
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    // Add the updatedAt field to the expression attribute values
    dxpressionAttributeValues[':updatedAt'] = { N: Date.now().toString() };

    if (removeExpression !== 'REMOVE ') {
      removeExpression = removeExpression.slice(0, -2); // Remove the last comma and space
      finalExpression = updateExpression + ' ' + removeExpression; // Combine the update and remove expressions
    } else {
      finalExpression = updateExpression;
    }

    // Update the user
    const params: UpdateItemCommandInput = {
      TableName: this.tableName,
      Key: {
        PK: { S: this.dbConstants.getPrimaryKey('Users') },
        SK: { S: this.dbConstants.getSortKey(user.uid) },
      },
      UpdateExpression: finalExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: dxpressionAttributeValues,
    };

    // Update the user
    await this.dbService.updateItem(params);

    // Return the updated user
    return {
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      cnss: user.cnss,
      isActive: user.isActive,
    } as User;
  }

  /**
   * @method delete
   * @description
   * This method is used to delete a user.
   * It takes in the email of the user to delete.
   * It returns a message indicating the user was deleted successfully.
   */
  async delete(email: string): Promise<{ message: string }> {
    // Find the user by uid
    const existingUser = await this.findByEmail(email);

    if (!existingUser) {
      throw new Error('userNotFound');
    }

    // Delete the user
    const params: DeleteItemCommandInput = {
      TableName: this.tableName,
      Key: {
        PK: { S: this.dbConstants.getPrimaryKey('Users') },
        SK: { S: this.dbConstants.getSortKey(existingUser.uid) },
      },
    };

    // Delete the user
    await this.dbService.deleteItem(params);

    // Delete the admin if the user is an organization admin
    if (existingUser.role === UserRoles.ORG_ADMIN) {
      await this.adminsService.delete(
        existingUser.uid,
        existingUser.organizationId
      );
    }

    // Return a message indicating the user was deleted successfully
    return { message: 'User deleted successfully' };
  }

  /**
   * @method get
   * @description
   * This method is used to get a user.
   * It takes in the uid of the user to get.
   * It returns the user.
   */
  async get(uid: string): Promise<User> {
    // Check if the user exists
    const existingUser = await this.findByUid(uid);

    if (!existingUser) {
      throw new Error('userNotFound');
    }

    return existingUser;
  }

  /**
   * @method findByUid
   * @description
   * This method is used to find a user by uid.
   * It takes in the uid of the user to find.
   * It returns the user found or null if not found.
   */
  async findByUid(uid: string): Promise<User | null> {
    // Query the user by uid
    const params: QueryCommandInput = {
      TableName: this.tableName,
      KeyConditionExpression: 'PK = :PK AND SK = :SK',
      ExpressionAttributeValues: {
        ':PK': { S: this.dbConstants.getPrimaryKey('Users') },
        ':SK': { S: this.dbConstants.getSortKey(uid) },
      },
    };

    try {
      // Fetch the user from the database
      const Items = await this.dbService.query(params);

      // Return the user found or null if not found
      if (!Items || Items.length === 0) {
        return null;
      }

      // Return the user found after mapping the DynamoDB item to a User object
      return this.dbService.mapDynamoDBItemToObject(Items[0]) as User;
    } catch (_) {
      return null;
    }
  }

  /**
   * @method findByEmail
   * @description
   * This method is used to find a user by email.
   * It takes in the email of the user to find.
   * It returns the user found or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    // Query the user by email
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': { S: email },
      },
    };

    try {
      // Fetch the user from the database
      const Items = await this.dbService.query(params);

      // Return the user found or null if not found
      if (!Items || Items.length === 0) {
        return null;
      }

      // Return the user found after mapping the DynamoDB item to a User object
      return this.dbService.mapDynamoDBItemToObject(Items[0]) as User;
    } catch (_) {
      return null;
    }
  }

  /**
   * @method findByCnss
   * @description
   * This method is used to find a user by CNSS.
   * It takes in the CNSS of the user to find.
   * It returns the user found or null if not found.
   */
  async findByCnss(cnss: string): Promise<User | null> {
    // Query the user by CNSS
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: 'CnssIndex',
      KeyConditionExpression: 'cnss = :cnss',
      ExpressionAttributeValues: {
        ':cnss': { S: cnss },
      },
    };

    try {
      // Fetch the user from the database
      const Items = await this.dbService.query(params);

      // Return the user found or null if not found
      if (!Items || Items.length === 0) {
        return null;
      }

      // Return the user found after mapping the DynamoDB item to a User object
      return this.dbService.mapDynamoDBItemToObject(Items[0]) as User;
    } catch (_) {
      return null;
    }
  }

  /**
   * @method findByOrganizationId
   * @description
   * This method is used to find users by organizationId.
   * It takes in the organizationId of the users to find.
   * It returns the users found or an empty array if not found.
   */
  async findByOrganizationId(organizationId: string): Promise<User[]> {
    // Query the user by organizationId
    const params: ScanCommandInput = {
      TableName: this.tableName,
      FilterExpression: 'organizationId = :organizationId',
      ExpressionAttributeValues: {
        ':organizationId': { S: organizationId },
      },
    };

    try {
      // Fetch the user from the database
      const Items = await this.dbService.scanItems(params);

      // Return an empty array if no users are found
      if (!Items || Items.length === 0) {
        return [];
      }

      // Return the users found after mapping the DynamoDB items to User objects
      const users = Items.map(
        (item) => this.dbService.mapDynamoDBItemToObject(item) as User
      );
      return users;
    } catch (_) {
      return [];
    }
  }

  /**
   * @method findByResetPasswordToken
   * @description
   * This method is used to find a user by reset password token.
   * It takes in the reset password token of the user to find.
   * It returns the user found or null if not found.
   */
  async findByResetPasswordToken(token: string): Promise<User | null> {
    // Query the user by reset password token
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: 'ResetPasswordTokenIndex',
      KeyConditionExpression: 'resetPasswordToken = :resetPasswordToken',
      ExpressionAttributeValues: {
        ':resetPasswordToken': { S: token },
      },
    };

    try {
      // Fetch the user from the database
      const Items = await this.dbService.query(params);

      // Return null if no user is found
      if (!Items || Items.length === 0) {
        return null;
      }

      // Return the user found after mapping the DynamoDB item to a User object
      return this.dbService.mapDynamoDBItemToObject(Items[0]) as User;
    } catch (_) {
      return null;
    }
  }

  /**
   * This method is used to get all users
   * @method getAll
   * @returns The list of users
   */
  async getAll(page: number, limit: number): Promise<User[]> {
    page = !page ? 1 : page;
    limit = !limit ? 10 : limit;
    const params: ScanCommandInput = {
      TableName: this.tableName,
    };

    try {
      const Items = await this.dbService.scanItems(params);

      // Implement pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedItems = Items.slice(start, end);

      // Map each DynamoDB item to an Organization object
      return paginatedItems.map((item) =>
        this.dbService.mapDynamoDBItemToObject(item)
      );
    } catch (error) {
      // Return an empty array if an error occurs
      return [];
    }
  }

  /**
   * @method getDynamoDBAttributeValue
   * @description
   * This method is used to get the DynamoDB attribute value of a given value.
   * It takes in the value to get the DynamoDB attribute value of.
   * It returns the DynamoDB attribute value.
   */
  private getDynamoDBAttributeValue(value: any): { [key: string]: any } {
    if (typeof value === 'string') return { S: value };
    if (typeof value === 'number') return { N: value.toString() };
    if (typeof value === 'boolean') return { BOOL: value };
    if (Array.isArray(value))
      return { L: value.map((item) => this.getDynamoDBAttributeValue(item)) };
    if (typeof value === 'object' && value !== null)
      return {
        M: Object.entries(value).reduce(
          (acc, [k, v]) => ({ ...acc, [k]: this.getDynamoDBAttributeValue(v) }),
          {}
        ),
      };
    return { NULL: true };
  }
}
