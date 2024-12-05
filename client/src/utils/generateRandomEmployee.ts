import dayjs from 'dayjs'

const firstNames = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил']
const lastNames = ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Федоров']
const departments = ['IT', 'HR', 'Бухгалтерия', 'Маркетинг', 'Продажи', 'Разработка', 'Дизайн', 'Аналитика']
const posts = ['Младший специалист', 'Специалист', 'Старший специалист', 'Ведущий специалист', 'Руководитель', 'Директор']

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

const getRandomAge = (min: number = 18, max: number = 65): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomSalary = (min: number = 30000, max: number = 200000): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomBirthDate = (age: number): string => {
  const today = dayjs()
  const birthYear = today.year() - age
  const randomMonth = Math.floor(Math.random() * 12)
  const randomDay = Math.floor(Math.random() * 28) + 1 // Используем 28 дней чтобы избежать проблем с февралем
  return dayjs().year(birthYear).month(randomMonth).date(randomDay).format('YYYY-MM-DD')
}

export const generateRandomEmployee = () => {
  const age = getRandomAge()
  return {
    firstName: getRandomElement(firstNames),
    lastName: getRandomElement(lastNames),
    age,
    birthDate: getRandomBirthDate(age),
    salary: getRandomSalary(),
    department: getRandomElement(departments),
    post: getRandomElement(posts),
  }
}
