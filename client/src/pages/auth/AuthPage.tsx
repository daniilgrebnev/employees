import { useState } from 'react'
import { Login } from './components/login/Login'
import { Registration } from './components/registration/Registration'
import styles from './auth.module.css'

export const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>
          {isLoginMode ? 'Вход в систему' : 'Регистрация'}
        </h2>
        
        {isLoginMode ? <Login /> : <Registration />}
        
        <div className={styles.switchMode}>
          <button 
            className={styles.switchButton}
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode 
              ? 'Нет аккаунта? Зарегистрироваться' 
              : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  )
}
