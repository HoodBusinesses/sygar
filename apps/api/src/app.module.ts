import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AuthModule } from './global/auth/auth.module';
// import { DbModule } from './global/db/db.module';
import { TrainingModule } from './global/training/theme.module';

@Module({
  imports: [TrainingModule],
  controllers: [AppController],
})
export class AppModule {}
