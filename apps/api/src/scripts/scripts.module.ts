import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '../global/db/db.module';
import { ScriptsService } from './scripts.service';
import { UserModule } from 'src/modules/user/user.module';
import { NotificationsModule } from 'src/global/notifactions/notifications.module';
import { AuthModule } from 'src/global/auth/auth.module';
import { OrganizationModule } from 'src/modules/organization/organization.module';
import { AbilityModule } from 'src/modules/ability/ability.module';
import { RbacModule } from 'src/global/rbac/roles.module';

/**
 * ScriptsModule handles database initialization and seeding operations.
 * This module consolidates all the necessary dependencies for database operations
 * and user seeding, including configuration, database access, and encryption services.
 */
@Module({
  imports: [
    // Load and make environment variables available throughout the application
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Import database functionality
    DbModule,
	UserModule,
	NotificationsModule,
	AuthModule,
	OrganizationModule,
	AbilityModule,
	RbacModule,
  ],
  providers: [
    ScriptsService,
  ],
  exports: [ScriptsService],
})
export class ScriptsModule {} 