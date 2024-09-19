import { Module } from '@nestjs/common';
import { TrainingController } from './theme.controller';
import { DbService } from '../db/db.service'; // Adjust the path as necessary
import { DbModule } from '../db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DbModule, ConfigModule],
  controllers: [TrainingController],
  providers: [DbService],
})
export class TrainingModule {}
