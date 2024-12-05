const express = require('express')
const cors = require('cors')
const { sequelize, checkConnection } = require('./config/db')
const employeesRouter = require('./routes/employees')
const authRouter = require('./routes/auth')

const app = express()
const PORT = 7070

// Middleware для парсинга JSON
app.use(cors())
app.use(express.json({ limit: '50mb' }))

// Маршруты аутентификации (публичные)
app.use('/api/auth', authRouter)

// Подключаем роутер учителей
app.use('/api', employeesRouter)

// Базовый маршрут
app.get('/', (req, res) => {
	res.json({ message: 'Сервер работает!' })
})

// Синхронизация с базой данных и запуск сервера
const start = async () => {
	try {
		await checkConnection()
		// Пересоздаем таблицы
		await sequelize.sync()
		app.listen(PORT, () => {
			console.log(`Сервер запущен на порту ${PORT}`)
		})
	} catch (error) {
		console.error('Ошибка при запуске сервера:', error)
		process.exit(1)
	}
}

start()
