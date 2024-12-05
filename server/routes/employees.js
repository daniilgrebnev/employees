const router = require('express').Router()
const Employee = require('../models/Employee')
const { auth } = require('../middleware/auth')

// Все маршруты защищены middleware auth
router.use(auth)

// Получение всех сотрудников с пагинацией
router.get('/employees', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1 // Текущая страница
        const limit = 15 // Количество элементов на странице
        const offset = (page - 1) * limit // Смещение для SQL запроса

        // Получаем общее количество записей
        const totalCount = await Employee.count()
        const totalPages = Math.ceil(totalCount / limit)

        // Получаем сотрудников для текущей страницы
        const employees = await Employee.findAll({
            limit,
            offset,
            order: [['id', 'ASC']] // Сортировка по ID
        })

        res.json({
            employees,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalCount,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Получить сотрудника по ID
router.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id)
        if (!employee) {
            return res.status(404).json({ message: 'Сотрудник не найден' })
        }
        res.json(employee)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Создать нового сотрудника
router.post('/employees', async (req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(201).json(employee)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Обновить сотрудника
router.put('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id)
        if (!employee) {
            return res.status(404).json({ message: 'Сотрудник не найден' })
        }
        await employee.update(req.body)
        res.json(employee)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Удалить сотрудника
router.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id)
        if (!employee) {
            return res.status(404).json({ message: 'Сотрудник не найден' })
        }
        await employee.destroy()
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
