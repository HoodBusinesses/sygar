import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './global/auth/auth.module';
import { DbModule } from './global/db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    DbModule,
    ConfigModule.forRoot(
    {
      isGlobal: true,
    }
  )],
  controllers: [AppController],
})
export class AppModule {}
