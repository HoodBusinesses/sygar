import { Global, Module } from "@nestjs/common";
import { AbilityService } from "./abiliry.service";

/**
 * @module AbilityModule
 * @description
 * This module is responsible for managing abilities in the application.
 * It provides the necessary providers and exports for handling abilities.
 * 
 * @remarks
 * The `AbilityModule` is decorated with the `@Global()` decorator to ensure that the module is available 
 * globally throughout the application.
 */
@Global()
@Module({
  providers: [AbilityService],
  exports: [AbilityService],
})
export class AbilityModule {}
