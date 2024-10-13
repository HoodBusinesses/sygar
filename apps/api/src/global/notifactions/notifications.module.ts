import { Module } from '@nestjs/common';
import { NotificationsGetWay } from './notifications.gateway';
import { NotificationService } from './notifications.service';

@Module({
  providers: [NotificationsGetWay, NotificationService],
  exports: [NotificationsGetWay, NotificationService]
})
export class NotificationsModule {}