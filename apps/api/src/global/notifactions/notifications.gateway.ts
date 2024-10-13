import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { NotificationService } from './notifications.service';
import { Notifications } from './model/notifactions.model';

@WebSocketGateway()
export class NotificationsGetWay implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server!: Server;
	private users: Map<string, Socket> = new Map();
	
	constructor(
		private readonly notificationService: NotificationService,
	) {}

	// @UseGuards(JwtGuard)
	async handleConnection(client: Socket) {
		console.log(`Client connected: ${client.id}`);

		const userUid: string = client.handshake.query.userUid as string; // Type assertion to string
		
		if (userUid)
			this.users.set(userUid, client);
		
	}

	async handleDisconnect(client: Socket) {
		this.users.forEach((val, key) => {
			if (val.id === client.id) {
				console.log(`User disconnected with UID: ${key}`);
				this.users.delete(key);
			}
		})
	}

	@SubscribeMessage('sendNotification')
	async handleSendNotification(client: Socket, payload: { userUid: string, messagee: string }) {
		const notifaction: Notifications = await this.notificationService.createNotification(payload.userUid, payload.messagee);
		this.server.to(payload.userUid).emit('notification', notifaction);
	}

	@SubscribeMessage('viewNotification')
	async handleViewNotification(client: Socket, notificationId: string) {
		await this.notificationService.markAsViewed(notificationId);
		client.emit('notificationId', notificationId);
	}

	@SubscribeMessage('broadcastNotification')
	async handleBroadcastNotification(client: Socket, payload: { userUids: string[], message: string}) {
		const notifactions: Notifications[] = await this.notificationService.broadcastToUsers(payload.userUids, payload.message);
		payload.userUids.map(async userUid => this.server.to(userUid).emit('motification', notifactions.find(n => n.userUid == userUid)));
	}
}