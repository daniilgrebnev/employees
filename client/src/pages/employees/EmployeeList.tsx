import { PlusOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { IEmployee } from '../../interfaces/auth'
import { useEmployeeStore } from '../../store/useEmployeeStore'
import { EmployeeCard } from './components/EmployeeCard'
import { EmployeeModal } from './components/EmployeeModal'
import styles from './employees.module.css'

export const EmployeeList = () => {
	const {
		employees,
		isLoading,
		currentPage,
		totalItems,
		itemsPerPage,
		searchTerm,
		fetchEmployees,
		deleteEmployee,
	} = useEmployeeStore()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedEmployee, setSelectedEmployee] = useState<
		IEmployee | undefined
	>()

	useEffect(() => {
		fetchEmployees(currentPage, searchTerm)
	}, [currentPage])

	const handleEdit = (employee: IEmployee) => {
		setSelectedEmployee(employee)
		setIsModalOpen(true)
	}

	const handleAdd = () => {
		setSelectedEmployee(undefined)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedEmployee(undefined)
	}

	const handlePageChange = (page: number) => {
		fetchEmployees(page, searchTerm)
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>Список сотрудников</h2>
				<Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
					Добавить сотрудника
				</Button>
			</div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<div className={styles.employeeList}>
						{employees.map(employee => (
							<EmployeeCard key={employee.id} employee={employee} />
						))}
					</div>
					<Pagination
						style={{ marginTop: 16 }}
						defaultCurrent={currentPage}
						total={totalItems}
						pageSize={itemsPerPage}
						onChange={handlePageChange}
					/>
				</>
			)}
			<EmployeeModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				employee={selectedEmployee}
			/>
		</div>
	)
}
