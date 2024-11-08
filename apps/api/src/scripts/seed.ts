import { NestFactory } from '@nestjs/core';
import { ScriptsModule } from './scripts.module';
import { ScriptsService } from './scripts.service';
import { UserRoles } from '../modules/user/model/user.model';

/**
 * Bootstrap function to seed initial users in the database.
 * Creates default SYGAR_ADMIN and SYGAR_USER accounts if they don't exist.
 *
 * Environment variables used:
 * - SYGAR_ADMIN_EMAIL: Email for admin account
 * - SYGAR_ADMIN_PASSWORD: Password for admin account
 * - SYGAR_USER_EMAIL: Email for user account
 * - SYGAR_USER_PASSWORD: Password for user account
 */
async function bootstrap() {
  // Create NestJS application context
  const app = await NestFactory.createApplicationContext(ScriptsModule);
  const scriptsService = app.get(ScriptsService);

  try {
    // Seed SYGAR Admin user
    await scriptsService.seedUser(
      UserRoles.SYGAR_ADMIN,
      '1',
      'Sygar',
      'Admin',
      'SYGAR_ADMIN_EMAIL',
      'SYGAR_ADMIN_PASSWORD'
    );

    // Seed SYGAR regular user
    await scriptsService.seedUser(
      UserRoles.SYGAR_USER,
      '2',
      'Sygar',
      'User',
      'SYGAR_USER_EMAIL',
      'SYGAR_USER_PASSWORD'
    );
  } catch (error) {
    console.error('Error seeding admins:', (error as Error).message);
  } finally {
    // Ensure application context is properly closed
    await app.close();
  }
}

// Execute the seeding process
bootstrap();
