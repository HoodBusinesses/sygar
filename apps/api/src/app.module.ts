import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './global/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import path = require('path'); // Import the path module for path resolution
import { DbModule } from './global/db/db.module';
import { SeedService } from './scripts/seed';

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
  providers: [SeedService], // Add the SeedService to the providers array for seeding admin users 
})
export class AppModule {}
