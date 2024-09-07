import { NationIdentifierTypes, Roles } from './enums';

export interface User {
  uid: string;
  cnss: string;
  nationalIdentifier: string;
  nationalIdentifierType: NationIdentifierTypes;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Roles;
  isActive: boolean;
  phone: string;
  resetPasswordToken: string;
  resetPasswordTokenExpiresAt: Date;
  passwordChangeAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
