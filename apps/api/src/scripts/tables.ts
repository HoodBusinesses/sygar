import { NestFactory } from '@nestjs/core';
import { ScriptsModule } from './scripts.module';
import { ScriptsService } from './scripts.service';
import { UserSchema } from '../modules/user/model/user.model';
import { AbilitySchema } from '../modules/ability/model/ability.model';
import { AdminSchema } from '../modules/admins/model/admins.model';
import { OrganizationSchema } from '../modules/organization/model/organization.model';
import { BillSchema } from '../modules/bill/model/bill.model';
import { CounterSchema } from '../modules/counter/model/counter.model';
import { NotificationSchema } from '../global/notifactions/model/notifactions.model';
import { ThemeSchema } from '../modules/organization/model/theme.model';

/**
 * Bootstrap function to create all required DynamoDB tables.
 * This script should be run during initial setup or when new tables need to be created.
 * 
 * Tables created:
 * - Users table
 * - Abilities table
 * - Organizations table
 * - Admins table
 * - Bills table
 * - Counters table
 * - Notifications table
 * - Themes table
 */
async function bootstrap() {
  // Create NestJS application context
  const app = await NestFactory.createApplicationContext(ScriptsModule);
  const scriptsService = app.get(ScriptsService);

  // Define all tables to be created
  const tables = [
    UserSchema,
    AbilitySchema,
    OrganizationSchema,
    AdminSchema,
    BillSchema,
    CounterSchema,
    NotificationSchema,
    ThemeSchema,
  ];

  try {
    // Create each table sequentially
    for (const table of tables) {
      console.log('Creating table ' + table.TableName);
      await scriptsService.createTable(table);
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    // Ensure application context is properly closed
    await app.close();
  }
}

// Execute the table creation process
bootstrap();
