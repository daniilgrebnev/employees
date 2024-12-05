import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Descriptions, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useEmployeeStore } from '../../../store/useEmployeeStore'
import styles from '../employees.module.css'

const { Title } = Typography

export const EmployeeDetails = () => {
	const { id } = useParams()
	const { employees, fetchEmployees } = useEmployeeStore()
	const employee = employees.find(emp => emp.id === Number(id))

	useEffect(() => {
		if (!employees.length) {
			fetchEmployees()
		}
	}, [])

	if (!employee) {
		return <div></div>
	}

	const {
		firstName,
		lastName,
		middleName,
		department,
		post,
		photo,
		birthDate,
		salary,
	} = employee

	return (
		<div className={styles.container}>
			<Card>
				<div className={styles.detailsHeader}>
					<Avatar
						size={128}
						src={photo}
						icon={!photo && <UserOutlined />}
						className={styles.detailsAvatar}
					/>
					<div className={styles.detailsInfo}>
						<Title level={2}>
							{`${lastName} ${firstName}${middleName ? ` ${middleName}` : ''}`}
						</Title>
						<Title level={4} type='secondary'>
							{post}
						</Title>
					</div>
				</div>

				<Descriptions
					layout='vertical'
					column={2}
					className={styles.descriptions}
				>
					<Descriptions.Item label='Отдел'>{department}</Descriptions.Item>
					<Descriptions.Item label='Должность'>{post}</Descriptions.Item>
					<Descriptions.Item label='Дата рождения'>
						{birthDate ? dayjs(birthDate).format('DD.MM.YYYY') : '-'}
					</Descriptions.Item>
					<Descriptions.Item label='Зарплата'>
						{salary?.toLocaleString('ru-RU')} ₽
					</Descriptions.Item>
				</Descriptions>
			</Card>
		</div>
	)
}
