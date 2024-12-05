import 'antd/dist/reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Layout } from './layout/Layout'
import { EmployeeList } from './pages/employees/EmployeeList'
import { EmployeesPage } from './pages/employees/EmployeesPage'
import './styles/variables.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<EmployeeList />} />
					<Route path='/employee/:id' element={<EmployeesPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
