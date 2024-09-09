import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './global/auth/auth.module';
import { DbModule } from './global/db/db.module';
import { InitTables } from './scripts/create-tables';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersModule } from './global/users/users.module';

@Module({
  imports: [AuthModule, DbModule, UsersModule],
  controllers: [AppController],
  providers: [InitTables, ],
})
export class AppModule {}
