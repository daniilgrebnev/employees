import {
	IAuthResponse,
	ILoginRequest,
	IRegisterRequest,
} from '../interfaces/auth'
import { instance } from './instance'

export const AuthAPI = {
	async login(data: ILoginRequest): Promise<IAuthResponse> {
		const response = await instance.post<IAuthResponse>('/auth/login', data)
		return response.data
	},

	async register(data: IRegisterRequest): Promise<IAuthResponse> {
		const response = await instance.post<IAuthResponse>('/auth/register', data)
		return response.data
	},

	async autoLogin(token: string): Promise<IAuthResponse> {
		const response = await instance.post<IAuthResponse>('/auth/auto-login', {
			token,
		})
		return response.data
	},
}
