import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DbConstants } from './db.constants';

/**
 * @module DbModule
 * @description
 * This module is responsible for providing database services and constants.
 * It is decorated with the `@Global()` decorator to ensure that the module is available globally throughout the application.
 */
@Global()
@Module({
  providers: [DbService, DbConstants],
  exports: [DbConstants, DbService],
})
export class DbModule {}
