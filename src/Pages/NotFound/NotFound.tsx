import React from 'react'
import { Container } from 'react-bootstrap'
import './NotFound.scss'

interface NotFoundProps {}

const NotFound = (props: NotFoundProps) => {
  return (
    <Container fluid className="NotFound p-0">
      <Container className="NotFound__content pt-2 pb-2">
        <h1>NotFound Page</h1>
      </Container>
    </Container>
  )
}

export default NotFound