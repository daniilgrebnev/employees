import { Button, Checkbox, Form, Input } from 'antd'
import { ILoginRequest } from '../../../../interfaces/auth'
import { useAuthStore } from '../../../../store/useAuthStore'
import styles from '../../auth.module.css'

export const Login = () => {
	const { login, isLoading, error } = useAuthStore()

	const onFinish = async (values: ILoginRequest) => {
		await login(values)
	}

	return (
		<Form
			name='login'
			onFinish={onFinish}
			layout='vertical'
			disabled={isLoading}
			initialValues={{ rememberMe: false }}
		>
			{error && <div className={styles.error}>{error}</div>}

			<Form.Item
				label='Логин'
				name='login'
				rules={[{ required: true, message: 'Введите логин' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Пароль'
				name='password'
				rules={[{ required: true, message: 'Введите пароль' }]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item name='rememberMe' valuePropName='checked'>
				<Checkbox>Запомнить меня</Checkbox>
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit' loading={isLoading} block>
					Войти
				</Button>
			</Form.Item>
		</Form>
	)
}
