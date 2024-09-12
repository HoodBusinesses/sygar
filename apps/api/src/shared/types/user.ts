import { Roles } from '../constants/roles.enums';
import { NationIdentifierTypes } from '../constants/nit.enums';

/**
 * Represents a user in the system.
 *
 * @interface User
 * @property {string} uid - The unique identifier of the user.
 * @property {string} cnss - The CNSS (Caisse Nationale de Sécurité Sociale) number of the user.
 * @property {string} nationalIdentifier - The national identifier of the user.
 * @property {NationIdentifierTypes} nationalIdentifierType - The type of national identifier.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {Roles} role - The role of the user.
 * @property {boolean} isActive - Indicates whether the user is active or not.
 * @property {string} phone - The phone number of the user.
 * @property {string} resetPasswordToken - The token used for resetting the user's password.
 * @property {string} resetPasswordTokenExpiresAt - The expiration date of the reset password token.
 * @property {string} passwordChangeAt - The date when the user's password was last changed.
 * @property {string} createdAt - The date when the user was created.
 * @property {string} updatedAt - The date when the user was last updated.
 */
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
  resetPasswordTokenExpiresAt: string;
  passwordChangeAt: string;
  createdAt: string;
  updatedAt: string;
}

