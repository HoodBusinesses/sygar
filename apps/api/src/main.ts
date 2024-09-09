declare const __dirname: string;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initializeDbService } from './scripts/create-tables';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('ejs');

  // Call initializeDbService to check if the tables already exist, and create them automatically if not.
  // It will keep trying to connect to the DynamoDB database if it is not listening yet.
  // If everything works fine and we are in Staging stage it's initial admins automatically too.
  await initializeDbService();

  await app.listen(1337);
}

bootstrap();
