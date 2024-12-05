import { create } from 'zustand'
import { EmployeesAPI } from '../api/employees.api'
import { IEmployee, IPaginationResponse } from '../interfaces/auth'

interface EmployeeState {
	employees: IEmployee[]
	currentPage: number
	totalPages: number
	totalItems: number
	itemsPerPage: number
	selectedEmployee: IEmployee | null
	searchTerm: string
	isLoading: boolean
	error: string | null

	// Actions
	setEmployees: (employees: IEmployee[]) => void
	setCurrentPage: (page: number) => void
	setPagination: (
		pagination: IPaginationResponse<IEmployee>['pagination']
	) => void
	setSelectedEmployee: (employee: IEmployee | null) => void
	setSearchTerm: (term: string) => void
	setLoading: (isLoading: boolean) => void
	setError: (error: string | null) => void

	// Async actions
	fetchEmployees: (page?: number, search?: string) => Promise<void>
	fetchEmployeeById: (id: number) => Promise<void>
	createEmployee: (data: Omit<IEmployee, 'id'>) => Promise<void>
	updateEmployee: (id: number, data: Partial<IEmployee>) => Promise<void>
	deleteEmployee: (id: number) => Promise<void>
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
	employees: [],
	currentPage: 1,
	totalPages: 1,
	totalItems: 0,
	itemsPerPage: 15,
	selectedEmployee: null,
	searchTerm: '',
	isLoading: false,
	error: null,

	// Synchronous actions
	setEmployees: employees => set({ employees }),
	setCurrentPage: page => set({ currentPage: page }),
	setPagination: pagination =>
		set({
			totalPages: pagination.totalPages,
			totalItems: pagination.totalItems,
			itemsPerPage: pagination.itemsPerPage,
		}),
	setSelectedEmployee: employee => set({ selectedEmployee: employee }),
	setSearchTerm: term => set({ searchTerm: term }),
	setLoading: isLoading => set({ isLoading }),
	setError: error => set({ error }),

	// Asynchronous actions
	fetchEmployees: async (page = 1, search = '') => {
		set({ isLoading: true, error: null })
		try {
			const response = await EmployeesAPI.getAll(page, search)
			set({
				employees: response.employees,
				currentPage: page,
				totalPages: response.pagination.totalPages,
				totalItems: response.pagination.totalItems,
				itemsPerPage: response.pagination.itemsPerPage,
				searchTerm: search,
				isLoading: false,
			})
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Ошибка при загрузке сотрудников',
				isLoading: false,
			})
		}
	},

	fetchEmployeeById: async id => {
		set({ isLoading: true, error: null })
		try {
			const employee = await EmployeesAPI.getById(id)
			set({ selectedEmployee: employee, isLoading: false })
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Ошибка при загрузке сотрудника',
				isLoading: false,
			})
		}
	},

	createEmployee: async data => {
		set({ isLoading: true, error: null })
		try {
			await EmployeesAPI.create(data)
			await get().fetchEmployees(get().currentPage, get().searchTerm)
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Ошибка при создании сотрудника',
				isLoading: false,
			})
		}
	},

	updateEmployee: async (id, data) => {
		set({ isLoading: true, error: null })
		try {
			await EmployeesAPI.update(id, data)
			await get().fetchEmployees(get().currentPage, get().searchTerm)
			if (get().selectedEmployee?.id === id) {
				const updatedEmployee = await EmployeesAPI.getById(id)
				set({ selectedEmployee: updatedEmployee })
			}
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Ошибка при обновлении сотрудника',
				isLoading: false,
			})
		}
	},

	deleteEmployee: async id => {
		set({ isLoading: true, error: null })
		try {
			await EmployeesAPI.delete(id)
			if (get().selectedEmployee?.id === id) {
				set({ selectedEmployee: null })
			}
			await get().fetchEmployees(get().currentPage, get().searchTerm)
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Ошибка при удалении сотрудника',
				isLoading: false,
			})
		}
	},
}))
