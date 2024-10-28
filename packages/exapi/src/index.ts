import { LoginParams, ResetPasswordParams, ForgotPasswordParams, ActivateAccountParams } from "./Args/auth";
import type { AxiosInstance } from "axios";
import axios from "axios";


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
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
	}

	api = () => ({
		auth: {
			login: (params: LoginParams) => {
				const endpoint = "/auth/login";
				return this.httpClient.post(endpoint, params);
			},
			forgotPassword: (params: ForgotPasswordParams) => {
				const endpoint = "/auth/forgot-password";
				return this.httpClient.post(endpoint, params);
			},
			resetPassword: (params: ResetPasswordParams) => {
				const endpoint = "/auth/reset-password";
				return this.httpClient.post(endpoint, params);
			},
			activateAccount: (params: ActivateAccountParams) => {
				const endpoint = "/auth/activate-acc";
				return this.httpClient.post(endpoint, params);
			}
		},
		users: {
			me: () => {
				const endpoint = '/auth/profile';
				return this.httpClient.get(endpoint)
			}
		},
	});
}

export * from './Args/auth'
export * from './modules/User'
