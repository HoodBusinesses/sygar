import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

/**
 * The UsersModule class represents a module for managing user-related functionality.
 * It provides the UsersService as a provider and exports it for use in other modules.
 */
@Module({
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
