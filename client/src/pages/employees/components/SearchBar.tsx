import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEmployeeStore } from '../../../store/useEmployeeStore'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import styles from '../employees.module.css'

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { fetchEmployees } = useEmployeeStore()
  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    fetchEmployees(1, debouncedSearch)
  }, [debouncedSearch])

  return (
    <Input
      placeholder="Поиск сотрудников..."
      prefix={<SearchOutlined />}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={styles.searchInput}
      allowClear
    />
  )
}
