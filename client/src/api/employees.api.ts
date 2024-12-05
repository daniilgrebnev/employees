import { IEmployee, IPaginationResponse } from '../interfaces/auth'
import { instance } from './instance'

export const EmployeesAPI = {
	async getAll(page: number = 1, search: string = '') {
		const { data } = await instance.get<IPaginationResponse<IEmployee>>(
			`/employees?page=${page}&search=${search}`
		)
		return data
	},

	async getById(id: number) {
		const response = await instance.get<IEmployee>(`/employees/${id}`)
		return response.data
	},

	async create(data: Omit<IEmployee, 'id'>) {
		const response = await instance.post<IEmployee>('/employees', data)
		return response.data
	},

	async update(id: number, data: Partial<IEmployee>) {
		const response = await instance.put<IEmployee>(`/employees/${id}`, data)
		return response.data
	},

	async delete(id: number) {
		await instance.delete(`/employees/${id}`)
	},
}
