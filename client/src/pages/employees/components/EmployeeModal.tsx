import { Button, DatePicker, Form, Input, InputNumber, Modal, Space, message } from 'antd'
import dayjs from 'dayjs'
import { IEmployee } from '../../../interfaces/auth'
import { useEmployeeStore } from '../../../store/useEmployeeStore'
import { generateRandomEmployee } from '../../../utils/generateRandomEmployee'
import styles from '../employees.module.css'
import { ImageUpload } from './ImageUpload'

interface EmployeeModalProps {
	isOpen: boolean
	onClose: () => void
	employee?: IEmployee
}

export const EmployeeModal = ({
	isOpen,
	onClose,
	employee,
}: EmployeeModalProps) => {
	const [form] = Form.useForm()
	const { createEmployee, updateEmployee, isLoading } = useEmployeeStore()

	const handleSubmit = async (values: any) => {
		const formattedValues = {
			...values,
			birthDate: values.birthDate.format('YYYY-MM-DD'),
			photo: values.photo || employee?.photo || '',
		}

		try {
			if (employee) {
				await updateEmployee(employee.id, formattedValues)
			} else {
				await createEmployee(formattedValues)
			}
			onClose()
			form.resetFields()
		} catch (error) {
			message.error('Ошибка при сохранении сотрудника')
		}
	}

	const fillRandomData = () => {
		const randomData = generateRandomEmployee()
		form.setFieldsValue({
			...randomData,
			birthDate: dayjs(randomData.birthDate),
		})
	}

	return (
		<Modal
			title={employee ? 'Редактировать сотрудника' : 'Добавить сотрудника'}
			open={isOpen}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={isLoading}
			width={600}
		>
			<Form
				form={form}
				layout='vertical'
				onFinish={handleSubmit}
				initialValues={
					employee
						? {
								...employee,
								birthDate: employee.birthDate
									? dayjs(employee.birthDate)
									: undefined,
								photo: employee.photo,
						  }
						: undefined
				}
			>
				<Space style={{ marginBottom: 16 }}>
					<Button onClick={fillRandomData}>
						Заполнить случайными данными
					</Button>
				</Space>

				<div className={styles.formLayout}>
					<div className={styles.photoSection}>
						<Form.Item name='photo' label='Фото сотрудника'>
							<ImageUpload />
						</Form.Item>
					</div>

					<div className={styles.infoSection}>
						<Form.Item
							name='firstName'
							label='Имя'
							rules={[{ required: true, message: 'Введите имя' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name='lastName'
							label='Фамилия'
							rules={[{ required: true, message: 'Введите фамилию' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item name='middleName' label='Отчество'>
							<Input />
						</Form.Item>

						<Form.Item
							name='birthDate'
							label='Дата рождения'
							rules={[{ required: true, message: 'Выберите дату рождения' }]}
						>
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>

						<Form.Item
							name='department'
							label='Отдел'
							rules={[{ required: true, message: 'Введите отдел' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name='post'
							label='Должность'
							rules={[{ required: true, message: 'Введите должность' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name='salary'
							label='Зарплата'
							rules={[{ required: true, message: 'Введите зарплату' }]}
						>
							<InputNumber
								style={{ width: '100%' }}
								formatter={value =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								parser={value => value!.replace(/\$\s?|(,*)/g, '')}
							/>
						</Form.Item>
					</div>
				</div>
			</Form>
		</Modal>
	)
}
