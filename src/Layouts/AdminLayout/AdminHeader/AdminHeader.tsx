import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { AiFillHome } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom'
import { Config } from '../../../Config/Config'
import useAuth from '../../../Hooks/useAuth'
import './AdminHeader.scss'

interface AdminHeaderProps {}

const AdminHeader = (props: AdminHeaderProps) => {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <Container fluid className="AdminHeader">
      <Container className="AdminHeader__content">
        <Nav>
          {/* <NavLink to={`/`}>
            <Nav.Item>
              <AiFillHome className="MainHeader__homeIcon" /> Главная
            </Nav.Item>
          </NavLink> */}
          <NavLink to={`/admin/`}>
            <AiFillHome className="MainHeader__homeIcon" /> Главная
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
          <a href="#" onClick={() => {
            auth.updateAuth(Config.defaultAuth)
            navigate("/")
          }}>
            <Nav.Item>Выход</Nav.Item>
          </a>
        </Nav>
      </Container>
    </Container>
  )
}

export default AdminHeader
