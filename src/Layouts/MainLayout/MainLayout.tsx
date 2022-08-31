import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet, Route, Routes } from 'react-router-dom'
import MainBody from './MainBody/MainBody'
import MainFooter from './MainFooter/MainFooter'
import MainHeader from './MainHeader/MainHeader'
import './MainLayout.scss'
import Main from '../../Pages/Main/Main'
import Second from '../../Pages/Second/Second'

interface MainLayoutProps {}

interface MainLayoutState {}

class MainLayout extends React.Component<MainLayoutProps, MainLayoutState> {
  render() {
    return (
      <Container fluid className="MainLayout p-0">
        <MainHeader />

        <MainBody>
          <Outlet />
        </MainBody>

        <MainFooter />
      </Container>
    )
  }
}

export default MainLayout
