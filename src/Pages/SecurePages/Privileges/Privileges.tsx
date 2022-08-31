import React from 'react'
import { Container } from 'react-bootstrap'
import './Privileges.scss'

interface PrivilegesProps {}

const Privileges = (prps: PrivilegesProps) => {
  return (
    <Container fluid className="Privileges p-0">
      <h1>Privileges</h1>
    </Container> 
  )
}

export default Privileges