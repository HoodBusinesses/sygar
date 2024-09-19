import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptService } from '../global/auth/crypt.service';
import { DbService } from '../global/db/db.service';
import { ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { DbConstants } from 'src/global/db/db.constants';
import { UserRoles } from 'src/modules/user/model/user.model';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly config: ConfigService,
    private readonly cryptService: CryptService,
    private readonly dbService: DbService,
		private readonly dbConstants: DbConstants,
  ) {}

  async onModuleInit() {
    await this.seedAdmins();
  }

  // Helper function to seed a user
  async seedUser(role: UserRoles, uid: string, firstName: string, lastName: string, emailKey: string, passwordKey: string) {
    const scanRoleParams: ScanCommandInput = {
      TableName: this.dbConstants.getTable('Users'),
      FilterExpression: '#role = :userRole',
      ExpressionAttributeNames: {
        '#role': 'role',
      },
      ExpressionAttributeValues: {
        ':userRole': { S: role },
      },
    };

    try {
      // Check if the user with the given role already exists
      const Items = await this.dbService.scanItems(scanRoleParams);
      if (Items.length > 0) return;

      // Create the user
      const user = {
        uid,
        PK: this.dbConstants.getPrimaryKey('Users'),
        SK: this.dbConstants.getSortKey(uid),
        firstName,
        lastName,
        email: this.config.get<string>(emailKey, `${role.toLowerCase()}@hood.com`),
        password: await this.cryptService.hash(
          this.config.get<string>(passwordKey, 'password'),
        ),
        role,
      };

      // Add the user to the database
      const putParams: PutCommandInput = {
        TableName: this.dbConstants.getTable('Users'),
        Item: user,
      };
      await this.dbService.putItem(putParams);
    } catch (error) {
      console.error(`Error seeding ${role}:`, (error as Error).message);
    }
  }

  // Function to seed both SYGAR Admin and User
  async seedAdmins() {
    try {
      await this.seedUser(
        UserRoles.SYGAR_ADMIN,
        '1',
        'Sygar',
        'Admin',
        'SYGAR_ADMIN_EMAIL',
        'SYGAR_ADMIN_PASSWORD',
      );
      await this.seedUser(
        UserRoles.SYGAR_USER,
        '2',
        'Sygar',
        'User',
        'SYGAR_USER_EMAIL',
        'SYGAR_USER_PASSWORD',
      );
    } catch (error) {
      console.error('Error seeding admins:', (error as Error).message);
    }
  }
}
