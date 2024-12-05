const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

// Регистрация
router.post('/register', async (req, res) => {
	try {
		const { login, password, firstName, lastName } = req.body

		// Проверяем наличие всех полей
		if (!login || !password || !firstName || !lastName) {
			return res.status(400).json({
				message: 'Все поля обязательны для заполнения',
			})
		}

		// Проверяем, существует ли пользователь
		const existingUser = await User.findOne({ where: { login } })
		if (existingUser) {
			return res.status(400).json({
				message: 'Пользователь с таким логином уже существует',
			})
		}

		// Создаем пользователя с токеном
		const token = uuidv4()
		const user = await User.create({
			login,
			password,
			firstName,
			lastName,
			token,
		})

		res.status(201).json({
			token,
			user: {
				id: user.id,
				login: user.login,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

// Логин
router.post('/login', async (req, res) => {
	try {
		const { login, password } = req.body

		// Ищем пользователя
		const user = await User.findOne({ where: { login } })
		if (!user) {
			return res.status(400).json({ message: 'Неверный логин или пароль' })
		}

		// Проверяем пароль
		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			return res.status(400).json({ message: 'Неверный логин или пароль' })
		}

		// Генерируем новый токен
		const token = uuidv4()
		await user.update({ token })

		res.json({
			token,
			user: {
				id: user.id,
				login: user.login,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

// Автоматическая авторизация по токену
router.post('/auto-login', async (req, res) => {
	try {
		const { token } = req.body

		if (!token) {
			return res.status(401).json({ message: 'Токен не предоставлен' })
		}

		// Находим пользователя по токену
		const user = await User.findOne({ where: { token } })

		if (!user) {
			return res.status(401).json({ message: 'Недействительный токен' })
		}

		res.json({
			token: user.token,
			user: {
				id: user.id,
				login: user.login,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		})
	} catch (error) {
		res.status(401).json({ message: 'Ошибка авторизации' })
	}
})

// Выход из системы
router.post('/logout', async (req, res) => {
	try {
		const { token } = req.body

		if (!token) {
			return res.status(400).json({ message: 'Токен не предоставлен' })
		}

		// Находим пользователя по токену
		const user = await User.findOne({ where: { token } })

		if (user) {
			// Очищаем токен
			await user.update({ token: null })
		}

		res.json({ message: 'Успешный выход из системы' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
