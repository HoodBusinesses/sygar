export interface CreateOrganParams {
  cnss: string;
  name: string;
  freeTrial: number;
}

export interface UpdateOrganParams {
  name: string;
  freeTrial: number;
}

export interface DeleteOrganParams {
    cnss: string;
}
