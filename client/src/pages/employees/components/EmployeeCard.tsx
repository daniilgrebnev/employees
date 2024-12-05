import { UserOutlined } from '@ant-design/icons'
import { Card, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { IEmployee } from '../../../interfaces/auth'
import styles from '../employees.module.css'

const { Text, Title } = Typography

interface EmployeeCardProps {
	employee: IEmployee
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
	const { id, firstName, lastName, department, post, photo } = employee

	return (
		<Link to={`/employee/${id}`}>
			<Card hoverable className={styles.employeeCard}>
				<div className={styles.cardContent}>
					<div className={styles.avatar}>
						{photo ? (
							<img
								width={150}
								height={150}
								src={photo}
								alt={`${firstName} ${lastName}`}
							/>
						) : (
							<UserOutlined />
						)}
					</div>
					<div className={styles.employeeInfo}>
						<Title level={5} className={styles.employeeName}>
							{lastName} {firstName}
						</Title>
						<Space direction='vertical' size={4}>
							<Text type='secondary'>{department}</Text>
							<Text>{post}</Text>
						</Space>
					</div>
				</div>
			</Card>
		</Link>
	)
}
