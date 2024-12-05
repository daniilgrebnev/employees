const { Sequelize } = require('sequelize')
const path = require('path')

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: path.join(__dirname, '../database.sqlite'),
	logging: false, // Отключаем логи SQL запросов
})

const checkConnection = async () => {
	try {
		await sequelize.authenticate()
		console.log('Подключение к SQLite успешно установлено')
	} catch (error) {
		console.error('Ошибка подключения к SQLite:', error)
		throw error
	}
}

module.exports = {
	sequelize,
	checkConnection,
}
