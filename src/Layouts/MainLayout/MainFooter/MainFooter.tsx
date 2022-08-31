import React from 'react'
import { Container } from 'react-bootstrap'
import './MainFooter.scss'

interface MainFooterProps {}

interface MainFooterState {}

class MainFooter extends React.Component<MainFooterProps, MainFooterState> {
  

  render() {
    return (
      <Container fluid className="MainFooter p-0 d-flex justify-content-center align-items-center pt-3 pb-3">
        <span>reactFront Mian Footer</span>        
      </Container>
    )
  }
}

export default MainFooter
