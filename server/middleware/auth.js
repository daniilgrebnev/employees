const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = 'your-secret-key' // В продакшене использовать process.env.JWT_SECRET

const auth = async (req, res, next) => {
	try {
		// Получаем токен из заголовка
		const token = req.header('Authorization')?.replace('Bearer ', '')

		if (!token) {
			return res.status(401).json({ message: 'Токен не предоставлен' })
		}

		// Ищем пользователя с таким токеном
		const user = await User.findOne({ where: { token } })

		if (!user) {
			return res.status(401).json({ message: 'Недействительный токен' })
		}

		// Добавляем пользователя в объект запроса
		req.user = user
		next()
	} catch (error) {
		res.status(401).json({ message: 'Ошибка авторизации' })
	}
}

module.exports = { auth }
