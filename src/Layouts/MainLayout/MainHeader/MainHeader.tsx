import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { AiFillHome } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import './MainHeader.scss'

interface MainHeaderProps {}

interface MainHeaderState {}

class MainHeader extends React.Component<MainHeaderProps, MainHeaderState> {
  render() {
    return (
      <Container fluid className="MainHeader">
        <Container className="MainHeader__content">
          <Nav>
            <NavLink to={`/`}>
              <Nav.Item>
                <AiFillHome className="MainHeader__homeIcon" /> Главная
              </Nav.Item>
            </NavLink>
            <NavLink to={`/second`}>
              <Nav.Item>О нас</Nav.Item>
            </NavLink>
            <NavLink to={`/admin/`}>
              <Nav.Item>Административная панель</Nav.Item>
            </NavLink>
          </Nav>
        </Container>
      </Container>
    )
  }
}

export default MainHeader
