// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { join } from 'path';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { Handler, Context, Callback } from 'aws-lambda';
// import serverlessExpress from '@vendia/serverless-express';  // Update this line
// import { ValidationPipe } from '@nestjs/common';

// let server: Handler;

// const SERVERLESS = (process.env.SYGAR_SERVERLESS ?? false) === 'false' ? false : (process.env.SYGAR_SERVERLESS ?? false) === 'true' ? true : process.env.SYGAR_SERVERLESS ?? false;
// console.log(SERVERLESS)

// console.log({ SERVERLESS })


// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   app.enableCors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   });
//   const config = new DocumentBuilder()
//     .setTitle('API Documentation')
//     .setDescription('API description')
//     .setVersion('1.0')
//     .addTag('api')
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api/docs', app, document);

//   app.useStaticAssets(join(__dirname, '..', 'public'));
//   app.setBaseViewsDir(join(__dirname, '..', 'views'));
//   app.setViewEngine('ejs');

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       transform: true,
//       forbidNonWhitelisted: true,
//       transformOptions: {
//         enableImplicitConversion: true,
//       },
//     })
//   );

//   if (SERVERLESS) {
//     return app;
//   } else {
//     console.log('listen')
//     app.listen(1337);
//   }
// }

// console.log({ SERVERLESS })
// if (!SERVERLESS) {
//   console.log('bootstrap')
//   bootstrap()
// }

// export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
//   if (!server && SERVERLESS) {

//     console.log({ SERVERLESS })
//     const app = await bootstrap();
//     const expressApp = app!.getHttpAdapter().getInstance();
//     server = serverlessExpress({ app: expressApp });  // Update this line
//   }
//   return server(event, context, callback);  // Update this line
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  await app.listen(1338);
}

bootstrap()