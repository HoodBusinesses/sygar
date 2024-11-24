import { CreateGroupParams, UpdateGroupParams } from 'Args/group';
import {
  CreateOrganParams,
  UpdateOrganParams
} from 'Args/org';
import {
  CreateParticipantParams,
  UpdateParticipantParams,
} from 'Args/participant';
import { CreateThemeParams, UpdateThemeParams } from 'Args/theme';
import {
  CreateUserParams,
  UpdateUserParams
} from 'Args/user';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import {
  ActivateAccountParams,
  ForgotPasswordParams,
  LoginParams,
  ResetPasswordParams,
} from './Args/auth';

export class Api {
  private httpClient: AxiosInstance;

  constructor(private readonly baseUrl: string = '') {
    this.httpClient = this.initializeHttpClient();
  }

  private initializeHttpClient() {
    return axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  api = () => ({
    auth: {
      login: (params: LoginParams) => {
        const endpoint = '/auth/login';
        return this.httpClient.post(endpoint, params);
      },
      forgotPassword: (params: ForgotPasswordParams) => {
        const endpoint = '/auth/forgot-password';
        return this.httpClient.post(endpoint, params);
      },
      resetPassword: (params: ResetPasswordParams) => {
        const endpoint = '/auth/reset-password';
        return this.httpClient.post(endpoint, params);
      },
      activateAccount: (params: ActivateAccountParams) => {
        const endpoint = '/auth/activate-account';
        return this.httpClient.post(endpoint, params);
      },
    },
    users: {
      me: () => {
        const endpoint = '/auth/profile';
        return this.httpClient.get(endpoint);
      },
    },
    user: {
      create: (params: CreateUserParams) => {
        const endpoint = '/user/create';
        return this.httpClient.post(endpoint, params);
      },
      update: (params: UpdateUserParams) => {
        const endpoint = '/user/update';
        return this.httpClient.put(endpoint, params);
      },
      delete: () => {
        const endpoint = '/user/delete';
        return this.httpClient.delete(endpoint);
      },
    },
    organization: {
      create: (params: CreateOrganParams) => {
        const endpoint = '/organizations';
        return this.httpClient.post(endpoint, params);
      },
      update: (params: UpdateOrganParams) => {
        const endpoint = '/organization/update';
        return this.httpClient.put(endpoint, params);
      },
      delete: () => {
        const endpoint = '/organization/delete';
        return this.httpClient.delete(endpoint);
      },
      get_all: () => {
        return this.httpClient.get('/organization/gat-all');
      },
    },
    theme: {
      create: (params: CreateThemeParams) => {
        const endpoint = '/theme/create';
        return this.httpClient.post(endpoint, params);
      },
      update: (params: UpdateThemeParams) => {
        const endpoint = '/theme/update';
        return this.httpClient.put(endpoint, params);
      },
      delete: () => {},
      gat_all: () => {
        return this.httpClient.get('/theme/get-all');
      },
    },
    participant: {
      create: (params: CreateParticipantParams) => {
        const endpoint = '/participant/create';
        return this.httpClient.post(endpoint, params);
      },
      update: (params: UpdateParticipantParams) => {
        const endpoint = '/participant/update';
        return this.httpClient.put(endpoint, params);
      },
      delete: () => {},
    },
    group: {
      create: (params: CreateGroupParams) => {
        const endpoint = '/group/create';
        return this.httpClient.post(endpoint, params);
      },
      update: (params: UpdateGroupParams) => {
        const endpoint = '/group/update';
        return this.httpClient.put(endpoint, params);
      },
      delete: () => {},
    },
  });
}

export * from './Args/auth';
export * from './modules/User';

