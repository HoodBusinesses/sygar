import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DbConstants } from './db.constants';

@Global()
@Module({
  providers: [DbService, DbConstants],
  exports: [DbConstants, DbService],
})
export class DbModule {}
