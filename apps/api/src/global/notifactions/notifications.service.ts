import { Injectable } from "@nestjs/common";
import { DbService } from "../db/db.service";
import { DbConstants } from "../db/db.constants";
import { v4 as uuid } from 'uuid';
import { Notifications } from "./model/notifactions.model";
import { PutCommandInput, ScanCommandInput, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";

/**
 * @class NotificationService
 * @description
 * This class is responsible for managing notifications.
 * It contains methods for creating notifications, getting notifications, marking notifications as viewed, and broadcasting notifications to multiple users.
 */
@Injectable()
export class NotificationService {
	private readonly table: string; // The table name
	private readonly tableName: string; // The table name with the prefix

	/**
	 * @constructor
	 * @param dbService The database service
	 * @param dbConstants The database constants
	 */
	constructor(
		private readonly dbService: DbService,
		private readonly dbConstants: DbConstants,
	)  {
		this.table = 'Notifications';
		this.tableName = dbConstants.getTable(this.table);
	}

	/**
	 * Create a new notification
	 * @param userUid The user UID
	 * @param message The message
	 * @returns The created notification
	 */
	async createNotification(userUid: string, message: string): Promise<Notifications> {
		// Generate a unique ID for the notification
		const uid = uuid();

		// Create a new notification object
		const newNotification: Notifications = {
			PK: this.dbConstants.getPrimaryKey(this.table),
			SK: this.dbConstants.getSortKey(uid),
			uid,
			userUid,
			message,
			viewed: false,
			createdAt: Date.now(),
		}

		// Create the put parameters
		const putParams: PutCommandInput = {
			TableName: this.tableName,
			Item: newNotification,
		};

		// Put the item in the database
		await this.dbService.putItem(putParams);

		// Return the created notification
		return newNotification;
	}

	/**
	 * Get a notification by ID
	 * @param notificationId The notification ID
	 * @returns The notification
	 * @throws Error if the notification is not found
	 */
	async getNotification(notificationId: string): Promise<Notifications> {
		// Create the scan parameters
		const getParams: ScanCommandInput = {
			TableName: this.tableName,
			FilterExpression: 'uid = :uid',
			ExpressionAttributeValues: {
				':uid': { S: notificationId },
			},
		};

		// Get the notification from the database
		const items = await this.dbService.scanItems(getParams);

		// If no items are found, throw an error
		if (!items.length) {
			throw new Error('Notification not found');
		}

		// Return the notification
		return this.dbService.mapDynamoDBItemToObject(items[0]) as Notifications;
	}

	/**
	 * Get all notifications for a user
	 * @param userUid The user UID
	 * @returns The user notifications
	*/
	async getUserNotifications(userUid: string): Promise<Notifications[]> {
		// Create the scan parameters
		const getParams: ScanCommandInput = {
			TableName: this.tableName,
			FilterExpression: 'userUid = :userUid',
			ExpressionAttributeValues: {
				':userUid': { S: userUid},
			},
		}

		// Get the notifications from the database
		const items = await this.dbService.scanItems(getParams);

		// Return the notifications
		return items.map(item => this.dbService.mapDynamoDBItemToObject(item) as Notifications);
	}

	/**
	 * Mark a notification as viewed
	 * @param notificationId The notification ID
	 * @returns The updated notification
	 * @throws Error if the notification is not found
	 */
	async markAsViewed(notificationId: string): Promise<Notifications> {
		// Get the notification
		const notification = await this.getNotification(notificationId);

		// If the notification is not found, throw an error
		if (!notification) {
			throw new Error('Notification not found');
		}

		// Create the update parameters
		const updateParams: UpdateCommandInput = {
			TableName: this.tableName,
			Key: {
				PK: { S: this.dbConstants.getPrimaryKey(this.table) },
				SK: { S: this.dbConstants.getSortKey(notificationId) },
			},
			UpdateExpression: 'SET viewed = :viewed, updatedAt = :updatedAt',
			ExpressionAttributeValues: {
				':viewed': { BOOL: true },
				':updatedAt': { N: Date.now().toString() },
			},
		};

		// Update the notification in the database
		await this.dbService.updateItem(updateParams);

		// Return the updated notification
		return {...notification, viewed: true, updatedAt: Date.now()};
	}

	/**
	 * Broadcast a message to multiple users
	 * @param userUids The user UIDs
	 * @param message The message
	 * @returns The created notifications
	 */
	async broadcastToUsers(userUids: string[], message: string): Promise<Notifications[]> {
		return await Promise.all(userUids.map(async userUid => await this.createNotification(userUid, message)));
	}
}
