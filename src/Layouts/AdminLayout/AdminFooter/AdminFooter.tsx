import React from 'react'
import { Container } from 'react-bootstrap'
import './AdminFooter.scss'

interface AdminFooterProps {}

const AdminFooter = (props: AdminFooterProps) => {
  return (
    <Container fluid className="AdminFooter p-0 d-flex justify-content-center align-items-center pt-3 pb-3">
      <span>reactFront Admin Footer</span>
    </Container>
  )
}

export default AdminFooter
