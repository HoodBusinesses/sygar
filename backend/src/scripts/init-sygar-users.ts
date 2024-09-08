import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "../global/db/dynamo.config";
import { User } from "../shared/users.interface";
import { Roles, NationIdentifierTypes } from "src/shared/enums";

// Define default user data for Sygar Admin and Super Admin
const sygarUsers: User[] = [
  {
    uid: "1", // Example ID, replace with a real unique ID generation logic
    cnss: "SYGAR-CNSS",
    nationalIdentifier: "SYGAR-ID-ADMIN",
    nationalIdentifierType: NationIdentifierTypes.CIN,
    firstName: "Sygar",
    lastName: "Admin",
    email: "sygaradmin@example.com",
    password: "hashed_password", // Make sure to hash the password securely
    role: Roles.ADMIN,
    isActive: true,
    phone: "000-111-2222",
    resetPasswordToken: "",
    resetPasswordTokenExpiresAt: new Date().toISOString(),
    passwordChangeAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    uid: "2", // Example ID, replace with a real unique ID generation logic
    cnss: "SYGAR-CNSS",
    nationalIdentifier: "SYGAR-ID-SUPERADMIN",
    nationalIdentifierType: NationIdentifierTypes.CIN,
    firstName: "Sygar",
    lastName: "SuperAdmin",
    email: "sygarsuperadmin@example.com",
    password: "hashed_password", // Make sure to hash the password securely
    role: Roles.SUPER_ADMIN,
    isActive: true,
    phone: "111-222-3333",
    resetPasswordToken: "",
    resetPasswordTokenExpiresAt: new Date().toISOString(),
    passwordChangeAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Function to check if Sygar Admin and Super Admin exist
export async function initializeSygarUsers(): Promise<boolean> {
  try {
    // Check if Sygar Admin and Super Admin exist
    const params = {
      TableName: "SYGAR_Users_STAGING",
      FilterExpression: "#role IN (:adminRole, :superAdminRole)",
      ExpressionAttributeNames: { "#role": "role" },
      ExpressionAttributeValues: { ":adminRole": Roles.ADMIN, ":superAdminRole": Roles.SUPER_ADMIN },
    };

    const results = await docClient.send(new ScanCommand(params));
    const existingUsers = results.Items || [];

    // If they do not exist, insert them
    for (const user of sygarUsers) {
      if (!existingUsers.some((existingUser: User) => existingUser.uid === user.uid)) {
        console.debug("Inserting user:", user);
        await docClient.send(new PutCommand({ TableName: "SYGAR_Users_STAGING", Item: user }));
        console.log(`User ${user.role} created successfully.`);
      }
    }
    return true;

  } catch (error) {
    console.error("Error initializing Sygar users:", error);
  }
  return false;
}