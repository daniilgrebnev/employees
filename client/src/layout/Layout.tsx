import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthPage } from '../pages/auth/AuthPage'
import { useAuthStore } from '../store/useAuthStore'
import styles from './layout.module.css'

export const Layout = () => {
	const { isAuth, checkAuth } = useAuthStore()

	useEffect(() => {
		checkAuth()
	}, [])

	if (!isAuth) {
		return <AuthPage />
	}

	return (
		<div>
			<header className={styles.header}>
				<div></div>
				<h3 className={styles.title}>Сотрудники</h3>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	)
}
