import { Global, Module } from "@nestjs/common";
import { AnimatorController, OrganizationController, ThemeController } from "./organization.controler";
import { AnimatorRepository, OrganizationRepository, ThemeRepository } from "./organization.repository";
import { AnimatorService, OrganizationService, ThemeService } from "./organization.service";

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
	controllers: [OrganizationController, ThemeController, AnimatorController],
	providers: [OrganizationRepository, OrganizationService, ThemeService, ThemeRepository, AnimatorService, AnimatorRepository],
	exports: [OrganizationRepository],
})
export class OrganizationModule {}
