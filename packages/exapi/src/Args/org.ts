type AddParticipant = {
	cnss: string;
  imageLink?: string;
	identity: string;
  identityType: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
};

export interface CreateOrganParams {
	name: string;
	cnss: string;
	imageLink?: string;
  address: string;
	ice: string;
	owner: AddParticipant;
}

export interface UpdateOrganParams {
  name: string;
  freeTrial: number;
}

export interface DeleteOrganParams {
    cnss: string;
}
