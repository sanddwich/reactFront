import React from 'react'
import { Container } from 'react-bootstrap'
import './AdminBody.scss'

interface AdminBodyProps {
  children: React.ReactNode
}

const AdminBody = (props: AdminBodyProps) => {
  return (
    <Container fluid className="AdminBody p-0">
      {props.children}
    </Container>
  )
}

export default AdminBody
