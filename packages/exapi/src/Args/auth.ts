export interface LoginParams {
	email: string,
	password: string,
}

export interface ForgotPasswordParams {
	email: string
}

export interface ResetPasswordParams {
	newPassword: string,
	token: string
}

export interface ActivateAccountParams {
	token: string,
	password: string
}
