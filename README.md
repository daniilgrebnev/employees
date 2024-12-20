# Employee Management System

Система управления сотрудниками с возможностью просмотра, добавления, редактирования и удаления информации о сотрудниках.

## Технологии

### Frontend
- React + TypeScript
- Vite (сборка проекта)
- Ant Design (UI компоненты)
- Zustand (управление состоянием)
- Axios (HTTP-клиент)
- Day.js (работа с датами)

### Backend
- Node.js + Express
- SQLite (база данных)
- Sequelize (ORM)

## Функциональность

- Авторизация пользователей
- CRUD операции с сотрудниками
- Загрузка фотографий сотрудников
- Пагинация (15 сотрудников на странице)
- Генерация случайных данных для быстрого заполнения
- Адаптивный дизайн

## Как запустить проект

1. Клонируйте репозиторий:
```bash
git clone https://github.com/daniilgrebnev/qmd.git
cd employees
```

2. Установите зависимости:
```bash
# Установка зависимостей для всего проекта
npm run install-all
```

3. Запустите проект:
```bash
# Запуск сервера и клиента одновременно
npm run dev
```

После запуска:
- Клиент будет доступен по адресу: http://localhost:5173
- Сервер будет запущен на порту: http://localhost:7070

## Структура проекта

```
project/
├── client/              # Frontend приложение
│   ├── src/
│   │   ├── api/        # API клиенты
│   │   ├── components/ # React компоненты
│   │   ├── pages/     # Страницы приложения
│   │   ├── store/     # Zustand store
│   │   └── utils/     # Утилиты
│   └── package.json
│
├── server/             # Backend приложение
│   ├── config/        # Конфигурация
│   ├── models/        # Модели данных
│   ├── routes/        # API маршруты
│   └── package.json
│
└── package.json       # Корневой package.json
```
