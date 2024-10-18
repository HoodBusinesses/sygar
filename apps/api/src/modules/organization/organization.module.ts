import { Global, Module } from "@nestjs/common";
import { OrganizationController, ThemeController } from "./organization.controler";
import { OrganizationRepository } from "./organization.repository";
import { OrganizationService } from "./organization.service";

/**
 * @module OrganizationModule
 * @description
 * This module is responsible for managing organizations in the application.
 * It provides the necessary providers and exports for handling organization functionality.
 * 
 * @remarks
 * The `OrganizationModule` is decorated with the `@Global()` decorator to ensure that the module is available 
 * globally throughout the application.
 */
@Global()
@Module({
	controllers: [OrganizationController, ThemeController],
	providers: [OrganizationRepository, OrganizationService],
	exports: [OrganizationRepository],
})
export class OrganizationModule {}
