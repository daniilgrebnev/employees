import {
	ArrowLeftOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	SaveOutlined,
} from '@ant-design/icons'
import {
	Button,
	Card,
	DatePicker,
	Descriptions,
	Form,
	Input,
	InputNumber,
	message,
	Modal,
	Space,
	Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmployeesAPI } from '../../api'
import { IEmployee } from '../../interfaces/auth'
import { ImageUpload } from './components/ImageUpload'
import styles from './employees.module.css'

const { Title } = Typography

export const EmployeesPage = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [form] = Form.useForm()
	const [employee, setEmployee] = useState<IEmployee | null>(null)
	const [isEditing, setIsEditing] = useState(false)

	const resetForm = () => {
		if (employee) {
			form.setFieldsValue({
				...employee,
				birthDate: employee.birthDate ? dayjs(employee.birthDate) : null,
			})
		}
	}

	useEffect(() => {
		const fetchEmployee = async () => {
			if (id) {
				try {
					const response = await EmployeesAPI.getById(Number(id))
					setEmployee(response)
					form.setFieldsValue({
						...response,
						birthDate: response.birthDate ? dayjs(response.birthDate) : null,
					})
				} catch (error) {
					message.error('Ошибка при загрузке данных сотрудника')
				}
			}
		}
		fetchEmployee()
	}, [id, form])

	const handleSave = async (values: any) => {
		try {
			const updatedData = {
				...values,
				birthDate: values.birthDate
					? values.birthDate.format('YYYY-MM-DD')
					: null,
				photo: values.photo || employee?.photo || '',
			}
			await EmployeesAPI.update(Number(id), updatedData)
			setEmployee({ ...employee!, ...updatedData })
			setIsEditing(false)
			message.success('Данные успешно сохранены')
		} catch (error) {
			message.error('Ошибка при сохранении данных')
		}
	}

	const handleCancel = () => {
		resetForm()
		setIsEditing(false)
	}

	const handleDelete = () => {
		Modal.confirm({
			title: 'Удаление сотрудника',
			content: 'Вы действительно хотите удалить этого сотрудника?',
			okText: 'Удалить',
			cancelText: 'Отмена',
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await EmployeesAPI.delete(Number(id))
					message.success('Сотрудник удален')
					navigate('/')
				} catch (error) {
					message.error('Ошибка при удалении сотрудника')
				}
			},
		})
	}

	if (!employee) {
		return <div>Loading...</div>
	}

	return (
		<div className={styles.container}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: 16,
				}}
			>
				<Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
					Назад к списку
				</Button>
				{isEditing ? (
					<Space>
						<Button icon={<CloseOutlined />} onClick={handleCancel}>
							Отменить
						</Button>
						<Button
							type='primary'
							icon={<SaveOutlined />}
							onClick={() => form.submit()}
						>
							Сохранить
						</Button>
					</Space>
				) : (
					<Space>
						<Button
							type='primary'
							icon={<EditOutlined />}
							onClick={() => setIsEditing(true)}
						>
							Редактировать
						</Button>
						<Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
							Удалить
						</Button>
					</Space>
				)}
			</div>

			<Card>
				<Form form={form} onFinish={handleSave} layout='vertical'>
					<div style={{ display: 'flex', gap: '24px' }}>
						<div style={{ flex: '0 0 200px' }}>
							{isEditing ? (
								<Form.Item name='photo' label='Фото'>
									<ImageUpload />
								</Form.Item>
							) : (
								<div>
									{employee.photo ? (
										<img
											src={employee.photo}
											alt={`${employee.firstName} ${employee.lastName}`}
											style={{
												width: '100%',
												height: '200px',
												objectFit: 'cover',
												borderRadius: '8px',
											}}
										/>
									) : (
										<div
											style={{
												width: '100%',
												height: '200px',
												background: '#f5f5f5',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												borderRadius: '8px',
											}}
										>
											Нет фото
										</div>
									)}
								</div>
							)}
						</div>
						<div style={{ flex: 1 }}>
							<Title level={2}>
								{isEditing ? (
									<div style={{ display: 'flex', gap: '8px' }}>
										<Form.Item
											name='lastName'
											style={{ marginBottom: 0, flex: 1 }}
										>
											<Input placeholder='Фамилия' />
										</Form.Item>
										<Form.Item
											name='firstName'
											style={{ marginBottom: 0, flex: 1 }}
										>
											<Input placeholder='Имя' />
										</Form.Item>
										<Form.Item
											name='middleName'
											style={{ marginBottom: 0, flex: 1 }}
										>
											<Input placeholder='Отчество' />
										</Form.Item>
									</div>
								) : (
									`${employee.lastName} ${employee.firstName}${
										employee.middleName ? ` ${employee.middleName}` : ''
									}`
								)}
							</Title>

							<Descriptions layout='vertical' column={2}>
								<Descriptions.Item label='Отдел'>
									{isEditing ? (
										<Form.Item name='department' style={{ marginBottom: 0 }}>
											<Input />
										</Form.Item>
									) : (
										employee.department
									)}
								</Descriptions.Item>
								<Descriptions.Item label='Должность'>
									{isEditing ? (
										<Form.Item name='post' style={{ marginBottom: 0 }}>
											<Input />
										</Form.Item>
									) : (
										employee.post
									)}
								</Descriptions.Item>
								<Descriptions.Item label='Дата рождения'>
									{isEditing ? (
										<Form.Item name='birthDate' style={{ marginBottom: 0 }}>
											<DatePicker format='DD.MM.YYYY' />
										</Form.Item>
									) : employee.birthDate ? (
										dayjs(employee.birthDate).format('DD.MM.YYYY')
									) : (
										'-'
									)}
								</Descriptions.Item>
								<Descriptions.Item label='Зарплата'>
									{isEditing ? (
										<Form.Item name='salary' style={{ marginBottom: 0 }}>
											<InputNumber
												style={{ width: '100%' }}
												formatter={value =>
													`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
												}
												parser={value => value!.replace(/\$\s?|(,*)/g, '')}
											/>
										</Form.Item>
									) : (
										`${employee.salary?.toLocaleString('ru-RU')} ₽`
									)}
								</Descriptions.Item>
							</Descriptions>
						</div>
					</div>
				</Form>
			</Card>
		</div>
	)
}
