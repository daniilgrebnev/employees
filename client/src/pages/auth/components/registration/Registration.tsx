import { Button, Form, Input } from 'antd'
import { useAuthStore } from '../../../../store/useAuthStore'
import styles from '../../auth.module.css'

export const Registration = () => {
  const { register, isLoading, error } = useAuthStore()

  const onFinish = async (values: { 
    login: string
    password: string
    firstName: string
    lastName: string 
  }) => {
    await register(values)
  }

  return (
    <Form
      name="register"
      onFinish={onFinish}
      layout="vertical"
      disabled={isLoading}
    >
      {error && <div className={styles.error}>{error}</div>}
      
      <Form.Item
        label="Имя"
        name="firstName"
        rules={[{ required: true, message: 'Введите имя' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Фамилия"
        name="lastName"
        rules={[{ required: true, message: 'Введите фамилию' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Логин"
        name="login"
        rules={[{ required: true, message: 'Введите логин' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  )
}
