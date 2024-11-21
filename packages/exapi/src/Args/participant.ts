export interface CreateParticipantParams {
  firstName: string;
  lastName: string;
  email: string;
  cnss: string;
  status: 'active' | 'inactive';
  organizationId: string;
}


export interface UpdateParticipantParams {
    firstName: string;
    lastName: string;
    email: string;
    status: 'active' | 'inactive';
}

