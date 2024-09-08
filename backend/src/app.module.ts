import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './models/users/user.service';
import { DatabaseConstants } from './global/db/db.constants';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DatabaseConstants, UserService],
})
export class AppModule {}
