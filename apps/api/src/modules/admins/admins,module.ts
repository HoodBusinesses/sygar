import { Module } from "@nestjs/common";
import { AdminsService } from "./admins.service";

/**
 * @module AdminsModule
 * @description
 * This module is responsible for managing admins in the application.
 * It provides the necessary providers and exports for handling admins.
 * 
 * @remarks
 * The `AdminsModule` is decorated with the `@Global()` decorator to ensure that the module is available 
 * globally throughout the application.
 */
@Module({
	providers: [AdminsService],
	exports: [AdminsService],
})
export class AdminsModule {}
