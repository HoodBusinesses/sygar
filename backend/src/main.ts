import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initTables } from './scripts/create-tables'
import { initializeSygarUsers } from "./scripts/init-sygar-users"; // Import the function

// Define the sleep function
function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function bootstrap() {
  let connectDb = true;
  const app = await NestFactory.create(AppModule);
  while (connectDb)
  {
      await initTables();
      if (process.env.NODE_ENV === 'Staging')
        connectDb = !await initializeSygarUsers();
      else
        connectDb = false;
      await sleep(4); // Use the sleep function
  }
  await app.listen(3000);
}
bootstrap();