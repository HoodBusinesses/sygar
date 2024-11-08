import { ConfigService } from '@nestjs/config';
import { DbConstants } from '../global/db/db.constants';
import { DbService } from '../global/db/db.service';
import { CryptService } from '../global/auth/crypt.service';

export function initializeServices() {
  const configService = new ConfigService();
  const dbConstants = new DbConstants(configService);
  const dbService = new DbService(configService);
  const cryptService = new CryptService();

  return {
    configService,
    dbConstants,
    dbService,
    cryptService,
  };
}
