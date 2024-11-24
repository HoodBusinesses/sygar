import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './rbac.service';
// import { AbilitiesGuard } from './rbac.guard';

/**
 * @module RbacModule
 * @description
 * This module is responsible for managing roles and permissions using Role-Based Access Control (RBAC).
 * It provides the necessary providers and exports for handling RBAC functionality.
 *
 * @remarks
 * The `RbacModule` is decorated with the `@Global()` decorator to ensure that the module is available
 * globally throughout the application.
 */

@Global()
@Module({
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class RbacModule { }
