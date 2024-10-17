import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notifications.service';
import { Notifications } from './model/notifactions.model';
import { JwtService } from '../auth/jwt.service';
import { ConfigService } from '@nestjs/config';

/**
 * @class NotificationsGateway
 * @description
 * This class is the gateway for handling notifications using WebSockets.
 * It is responsible for handling connections, disconnections, and sending notifications to users.
 * It is decorated with the `@WebSocketGateway()` decorator to indicate that it is a WebSocket gateway.
 * It implements the `OnGatewayConnection` and `OnGatewayDisconnect` interfaces to handle connection and disconnection events.
 * It also contains methods for sending notifications, marking notifications as viewed, and broadcasting notifications to multiple users.
 * The `@SubscribeMessage()` decorator is used to define the message types that the gateway can handle.
 * The `@WebSocketServer()` decorator is used to inject the WebSocket server instance.
 */
@WebSocketGateway()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    // Inject the necessary services and configuration
    @WebSocketServer() server!: Server;

    // Map to store the user sockets
    private users: Map<string, Socket[]> = new Map();

    // JWT secret key
    private readonly jwtSecret: string;

    /**
     * @constructor
     * @param configService The configuration service
     * @param notificationService The notification service
     * @param jwtService The JWT service
     */
    constructor(
        private readonly configService: ConfigService,
        private readonly notificationService: NotificationService,
        private readonly jwtService: JwtService,
    ) {
        this.jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET_TOKEN'); // Get the JWT secret key from the configuration
    }

    /**
     * Handle incoming connections
     * @param client The socket client
     */
    async handleConnection(client: Socket) {
        // Extract the token from the client
        const token = this.extractToken(client);

        // If no token is found, disconnect the client
        if (!token) {
            client.disconnect(true);
            return;
        }

        try {
            // Verify the token using JwtService
            const payload: any = await this.jwtService.verifyAsync(token, this.jwtSecret);

            // Assuming the payload contains a user UID
            const uid = payload.uid;
            if (uid) {
                if (!this.users.has(uid)) {
                    this.users.set(uid, []);
                }
                this.users.get(uid)!.push(client);
                client.data.user = payload; // Attach user data to the socket for future use
            } else {
                client.disconnect(true); // Disconnect the client if the token is invalid
            }
        } catch (error) {
            client.disconnect(true); // Disconnect the client if the token is invalid
        }
    }

    /**
     * Handle disconnections
     * @param client The socket client
     */
    async handleDisconnect(client: Socket) {
        // Remove the client from the user sockets
        this.users.forEach((sockets, uid) => {
            const index = sockets.findIndex(val => val.id === client.id);
            if (index !== -1) {
                sockets.splice(index, 1);
                if (sockets.length === 0) {
                    this.users.delete(uid); // Remove the user if no sockets are left
                }
            }
        });
    }

    /**
     * Handle sending notifications to a user
     * @param client The socket client
     * @param payload The notification payload
     */
    @SubscribeMessage('sendNotification') // Define the message type for sending notifications
    async handleSendNotification(client: Socket, payload: any) {
        // Get the user data from the client
        const user = client.data.user;

        // If no user data is found, emit an error message and return
        if (!user) {
            client.emit('error', { message: 'Unauthorized' });
            return;
        }

        // Extract the notification data from the payload
        const { uid, message } = payload[0];

        if (!uid) {
            client.emit('error', { message: 'Invalid UID' });
            return;
        }

        try {
            // Create the notification
            const notification: Notifications = await this.notificationService.createNotification(uid, message);

            // Get the user sockets and emit the notification
            const userSockets = this.users.get(uid);

            // Emit the notification to all user sockets
            userSockets?.forEach(socket => socket.emit('notification', notification));
        } catch (error) {
            client.emit('error', { message: 'Failed to send notification' });
        }
    }

    /**
     * Handle marking a notification as viewed
     * @param client The socket client
     * @param payload The notification ID payload
     */
    @SubscribeMessage('viewNotification') // Define the message type for marking notifications as viewed
    async handleViewNotification(client: Socket, payload: any) {
        const user = client.data.user; 
        if (!user) {
            client.emit('error', { message: 'Unauthorized' });
            return;
        }

        // Extract the notification ID from the payload
        const { notificationId } = payload[0];

        // If no notification ID is found, emit an error message and return
        if (!notificationId) {
            client.emit('error', { message: 'Invalid notification ID' });
            return;
        }

        try {
            // Mark the notification as viewed
            const notification = await this.notificationService.markAsViewed(notificationId);

            // Get the user sockets and emit the notification viewed event
            const userSockets = this.users.get(notification.userUid);

            // Emit the notification viewed event to all user sockets
            userSockets?.forEach(socket => socket.emit('notificationViewed', { notification }));
        } catch (error) {
            client.emit('error', { message: 'Failed to mark notification as viewed' });
        }
    }

    /**
     * Handle broadcasting notifications to multiple users
     * @param client The socket client
     * @param payload The broadcast payload
     */
    @SubscribeMessage('broadcastNotification') // Define the message type for broadcasting notifications
    async handleBroadcastNotification(client: Socket, payload: any) {
        const user = client.data.user;
        if (!user) {
            client.emit('error', { message: 'Unauthorized' });
            return;
        }
        const { uids, message } = payload[0] as { uids: string[], message: string };
        
        try {
            // Broadcast the notification to the specified users
            const notifications: Notifications[] = await this.notificationService.broadcastToUsers(uids, message);

            // Get the user sockets and emit the notifications
            payload.uids.forEach((uid: string)  => {
                const notification = notifications.find(n => n.uid === uid);

                // Emit the notification to all user sockets
                if (notification) { 
                    const userSockets = this.users.get(uid);
                    userSockets?.forEach(socket => socket.emit('notification', notification));
                }
            });
        } catch (error) {
            client.emit('error', { message: 'Failed to broadcast notification' });
        }
    }

    /**
     * Extract the token from the client
     * @param client The socket client
     * @returns The token if found, null otherwise
     */
    private extractToken(client: Socket): string | null {
        // Extract the token from the query parameters (could also be headers)
        return client.handshake.query['token'] as string || null;
    }
}
