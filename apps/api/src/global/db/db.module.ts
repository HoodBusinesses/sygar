import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DbConstants } from './db.constants';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DbService, DbConstants],
  exports: [DbConstants, DbService],
})
export class DbModule {}
