import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import ButtonComponent from '../../../SharedComponents/ButtonComponent/ButtonComponent'
import './AdminMain.scss'

interface AdminMainProps {}

const AdminMain = (prps: AdminMainProps) => {
  return (
    <Container className="AdminMain p-0">
      <h1>AdminMain</h1>
      <p>Панель Администратора</p>
      <div className="AdminMain__buttonCont">
        <NavLink to={`/admin/users`}>
          <ButtonComponent>Пользователи</ButtonComponent>
        </NavLink>
        <NavLink to={`/admin/roles`}>
          <ButtonComponent>Роли</ButtonComponent>
        </NavLink>
        <NavLink to={`/admin/privileges`}>
          <ButtonComponent>Привилегии</ButtonComponent>
        </NavLink>
      </div>
    </Container>
  )
}

export default AdminMain
