import { Global, Module, forwardRef } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationService } from './notifications.service';
import { UserModule } from 'src/modules/user/user.module'; // Import UserModule


/**
 * @module NotificationsModule
 * @description
 * This module is responsible for handling notifications using WebSockets.
 */
@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),

  ],
  providers: [NotificationsGateway, NotificationService],
  exports: [NotificationsGateway, NotificationService]
})
export class NotificationsModule {}