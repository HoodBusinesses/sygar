import { Injectable } from "@nestjs/common";
import { DbService } from "../db/db.service";
import { DbConstants } from "../db/db.constants";
import { v4 as uuid } from 'uuid';
import { Notifications } from "./model/notifactions.model";
import { GetCommandInput, PutCommandInput, ScanCommandInput, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { NotificationsGetWay } from "./notifications.gateway";

@Injectable()
export class NotificationService {
	private readonly table: string;
	private readonly tableName: string;

	constructor(
		private readonly dbService: DbService,
		private readonly dbConstants: DbConstants,
	)  {
		this.table = 'Notifications';
		this.tableName = dbConstants.getTable(this.table);
	}

	async createNotification(userUid: string, message: string): Promise<Notifications> {
		const uid = uuid();
		let newNotification: Notifications = {
			PK: this.dbConstants.getPrimaryKey(this.table),
			SK: this.dbConstants.getSortKey(uid),
			uid,
			userUid,
			message,
			viewed: false,
			createdAt: Date.now(),
		}

		const putParams: PutCommandInput = {
			TableName: this.tableName,
			Item: newNotification,
		};

		await this.dbService.putItem(putParams);

		return newNotification;
	}

	async getUserNotifications(userUid: string): Promise<Notifications[]> {
		const getParams: ScanCommandInput = {
			TableName: this.tableName,
			FilterExpression: 'userUid = :userUid',
			ExpressionAttributeValues: {
				':userUid': { S: userUid},
			},
		}

		const items = await this.dbService.scanItems(getParams);
		return items.map(item => this.dbService.mapDynamoDBItemToObject(item) as Notifications);
	}

	async markAsViewed(notificationId: string): Promise<void> {
		const Updateparams: UpdateCommandInput = {
			TableName: this.tableName,
			Key: {
				uid: { S: notificationId },
			},
			UpdateExpression: 'SET viewed = :viewed, updatedAt = :updatedAt',
			ExpressionAttributeValues: {
				':viewed': { BOOL: true },
				':updatedAt': { N: Date.now() },
			},
		};

		await this.dbService.updateItem(Updateparams);
	}

	async broadcastToUsers(userUids: string[], message: string): Promise<Notifications[]> {
		return await Promise.all(userUids.map(async userUid => await this.createNotification(userUid, message)));
	}
}