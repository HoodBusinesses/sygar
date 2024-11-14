export interface CreateUserParams {

  cnss: string;
  nationalIdentifier: string;
  nationalIdentifierType: 'CIN' | 'PASSPORT' | 'PERMIS';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'SYGAR_ADMIN' | 'SYGAR_USER' | 'ORG_ADMIN' | 'ORG_USER';
  organizationId: string; // this the organization cnss
}

export interface UpdateUserParams {

  uid: string;
  cnss: string;
  nationalIdentifier: string;
  nationalIdentifierType: 'CIN' | 'PASSPORT' | 'PERMIS';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: string;
  password: string;
}

export interface DeleteUserParams {
    email: string;
}


