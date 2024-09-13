import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
})
export class AppModule {}
