import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { resolve } from 'path';

export function initializeConfig(): ConfigService {
  // Load environment variables from .env file
  config({ path: resolve(__dirname, '../../../.env') });

  // Initialize and return ConfigService with process.env
  return new ConfigService({
    ...process.env,
  });
}
