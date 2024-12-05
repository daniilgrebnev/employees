export interface ILoginRequest {
	login: string
	password: string
}

export interface IRegisterRequest extends ILoginRequest {
	firstName: string
	lastName: string
}

export interface IUser {
	id: number
	login: string
	firstName: string
	lastName: string
}

export interface IAuthResponse {
	token: string
	user: IUser
}

export interface IEmployee {
	id: number
	firstName: string
	lastName: string
	middleName?: string
	birthDate: string
	department: string
	post: string
	salary: number
	photo: string
}

export interface IPaginationResponse<T> {
	employees: IEmployee[] | undefined
	items: T[]
	pagination: {
		currentPage: number
		totalPages: number
		totalItems: number
		itemsPerPage: number
		hasNextPage: boolean
		hasPreviousPage: boolean
	}
}
