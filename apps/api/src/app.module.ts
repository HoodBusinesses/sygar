import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './global/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import path = require('path');
import { DbModule } from './global/db/db.module';
import { DbService } from './global/db/db.service';

@Module({
  imports: [
    AuthModule,
    // TODO: validate schema and load default env's
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: path.join(__dirname, "..", ".env"),
      // validationSchema,
      // validationOptions,
      // load: [appConfig(process.env.NODE_ENV)],
    }),
    DbModule,
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dbService: DbService) {}

  async onModuleInit() {
    await this.dbService.seedAdmin();
  }
}
