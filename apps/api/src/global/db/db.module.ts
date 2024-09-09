import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DatabaseConstants } from './db.constants';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [DbService, DatabaseConstants, ConfigService],
  exports: [DatabaseConstants, DbService, ConfigService],
})
export class DbModule {}