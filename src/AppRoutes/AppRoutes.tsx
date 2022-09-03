import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../Layouts/AdminLayout/AdminLayout'
import MainLayout from '../Layouts/MainLayout/MainLayout'
import Hooks from '../Pages/Hooks/Hooks'
import LoginPage from '../Pages/LoginPage/LoginPage'
import Main from '../Pages/Main/Main'
import NotFound from '../Pages/NotFound/NotFound'
import Second from '../Pages/Second/Second'
import AdminMain from '../Pages/SecurePages/AdminMain/AdminMain'
import Privileges from '../Pages/SecurePages/Privileges/Privileges'
import Roles from '../Pages/SecurePages/Roles/Roles'
import Users from '../Pages/SecurePages/Users/Users'
import TestPage from '../Pages/TestPage/TestPage'
import AuthCheck from '../Services/AuthCheck'

interface AppRoutesProps {}

const AppRoutes = (props: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Main />} />
        <Route path="second" element={<Second />} />
        <Route path="auth" element={<LoginPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="hooks" element={<Hooks />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin/"
        element={
          <AuthCheck>
            <AdminLayout />
          </AuthCheck>
        }
      >
        <Route index element={<AdminMain />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="privileges" element={<Privileges />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  )
}

export default AppRoutes
