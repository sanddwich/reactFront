import React from 'react'
import { Container } from 'react-bootstrap'
import './Roles.scss'

interface RolesProps {}

const Roles = (prps: RolesProps) => {
  return (
    <Container fluid className="Roles p-0">
      <h1>Roles</h1>
    </Container> 
  )
}

export default Roles