import axios from 'axios'

// Используем переменную окружения или захардкоженный URL для разработки
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7070/api'

export const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

instance.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

instance.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status === 401) {
			localStorage.removeItem('token')
			window.location.href = '/auth'
		}
		return Promise.reject(error)
	}
)
