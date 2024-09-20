import { ConfigService } from '@nestjs/config';
import { CryptService } from '../global/auth/crypt.service';
import { DbService } from '../global/db/db.service';
import { ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { DbConstants } from 'src/global/db/db.constants';
import { UserRoles } from 'src/modules/user/model/user.model';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb';


const configService = new ConfigService();
const dbConstants = new DbConstants(configService);
const dbService = new DbService(configService);
const cryptService = new CryptService();

// Helper function to seed a user
export  const seedUser = async (role: UserRoles, uid: string, firstName: string, lastName: string, emailKey: string, passwordKey: string) => {
  const scanRoleParams: ScanCommandInput = {
    TableName: dbConstants.getTable('Users'),
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
    const Items = await dbService.scanItems(scanRoleParams);
    if (Items.length > 0) {
      console.log(`${role} already seeded`);
      return;
    }

    // Create the user
    const user = {
      uid,
      PK: dbConstants.getPrimaryKey('Users'),
      SK: dbConstants.getSortKey(uid),
      firstName,
      lastName,
      email: configService.get<string>(emailKey, `${role.toLowerCase()}@hood.com`),
      password: await cryptService.hash(
        configService.get<string>(passwordKey, 'password'),
      ),
      role,
    };

    // Add the user to the database
    const putParams: PutCommandInput = {
      TableName: dbConstants.getTable('Users'),
      Item: user,
    };
    await dbService.putItem(putParams);
  } catch (error) {
    console.error(`Error seeding ${role}:`, (error as Error).message);
  }
  console.log(`Seeded ${role} successfully`);
}

// Function to seed both SYGAR Admin and User
export const seedAdmins =  async () => {
  try {
    await seedUser(
      UserRoles.SYGAR_ADMIN,
      '1',
      'Sygar',
      'Admin',
      'SYGAR_ADMIN_EMAIL',
      'SYGAR_ADMIN_PASSWORD',
    );
    await seedUser(
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


seedAdmins(); // This will seed the admins when the script is run