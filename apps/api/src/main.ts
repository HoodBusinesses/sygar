import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('ejs');

  // We are using the ValidationPipe to validate the incoming request payload.
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // If set to true, extraneous properties will be stripped from the incoming request payload.
      transform: true, // If set to true, the pipe will perform the necessary type conversion to the value type.
      forbidNonWhitelisted: true, // If set to true, the pipe will throw an exception if the incoming request payload contains properties that are not decorated with a validation decorator.
      // transformOptions is an object that can be used to configure the behavior of the class-transformer library.
      transformOptions: {
        enableImplicitConversion: true, // If set to true, the pipe will perform implicit type conversion for primitive types.
      },
    }
  ));

  await app.listen(1337);
}
bootstrap();
