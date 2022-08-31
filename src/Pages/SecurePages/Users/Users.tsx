import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import './Users.scss'

interface UsersProps {}

const Users = (prps: UsersProps) => {
  return (
    <Container fluid className="Users p-0">
      <h1>Users</h1>
    </Container> 
  )
}

export default Users