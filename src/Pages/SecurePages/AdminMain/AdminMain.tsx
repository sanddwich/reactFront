import React from 'react'
import { Container } from 'react-bootstrap'
import './AdminMain.scss'

interface AdminMainProps {}

const AdminMain = (prps: AdminMainProps) => {
  return (
    <Container fluid className="AdminMain p-0">
      <h1>AdminMain</h1>
    </Container> 
  )
}

export default AdminMain