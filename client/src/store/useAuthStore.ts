import { create } from 'zustand'
import { AuthAPI } from '../api/auth.api'
import { ILoginRequest, IRegisterRequest, IUser } from '../interfaces/auth'

interface AuthState {
	user: IUser | null
	isAuth: boolean
	isLoading: boolean
	error: string | null

	// Actions
	setUser: (user: IUser | null) => void
	setAuth: (isAuth: boolean) => void
	setLoading: (isLoading: boolean) => void
	setError: (error: string | null) => void

	// Async actions
	login: (data: ILoginRequest) => Promise<void>
	register: (data: IRegisterRequest) => Promise<void>

	checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
	user: null,
	isAuth: false,
	isLoading: false,
	error: null,

	// Synchronous actions
	setUser: user => set({ user }),
	setAuth: isAuth => set({ isAuth }),
	setLoading: isLoading => set({ isLoading }),
	setError: error => set({ error }),

	// Asynchronous actions
	login: async data => {
		set({ isLoading: true, error: null })
		try {
			const response = await AuthAPI.login(data)
			localStorage.setItem('token', response.token)
			set({
				user: response.user,
				isAuth: true,
				isLoading: false,
			})
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Ошибка при входе',
				isLoading: false,
			})
		}
	},

	register: async data => {
		set({ isLoading: true, error: null })
		try {
			const response = await AuthAPI.register(data)
			localStorage.setItem('token', response.token)
			set({
				user: response.user,
				isAuth: true,
				isLoading: false,
			})
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Ошибка при регистрации',
				isLoading: false,
			})
		}
	},

	checkAuth: async () => {
		set({ isLoading: true, error: null })
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				set({ isLoading: false })
				return
			}

			const response = await AuthAPI.autoLogin(token)
			set({
				user: response.user,
				isAuth: true,
				isLoading: false,
			})
		} catch (error) {
			localStorage.removeItem('token')
			set({
				user: null,
				isAuth: false,
				error: error instanceof Error ? error.message : 'Сессия истекла',
				isLoading: false,
			})
		}
	},
}))
