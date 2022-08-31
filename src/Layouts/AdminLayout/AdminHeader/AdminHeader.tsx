import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './AdminHeader.scss'

interface AdminHeaderProps {}

const AdminHeader = (props: AdminHeaderProps) => {
  return (
    <Container fluid className="AdminHeader">
      <Container className="AdminHeader__content">
        <Nav>
          <NavLink to={`/admin/`}>
            <Nav.Item>Главная</Nav.Item>
          </NavLink>
          <NavLink to={`/admin/users`}>
            <Nav.Item>Пользователи</Nav.Item>
          </NavLink>
          <NavLink to={`/admin/roles`}>
            <Nav.Item>Роли</Nav.Item>
          </NavLink>
          <NavLink to={`/admin/privileges`}>
            <Nav.Item>Привилегии</Nav.Item>
          </NavLink>
        </Nav>
      </Container>
    </Container>
  )
}

export default AdminHeader
