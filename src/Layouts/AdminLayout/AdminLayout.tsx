import React from "react"
import { Container } from "react-bootstrap"
import "./AdminLayout.scss"

interface AdminLayoutProps {}

const AdminLayout = (props: AdminLayoutProps) => {
  return (
    <Container fluid className="AdminLayout p-0">
      <h1>AdminLayout</h1>
    </Container>
  )
}

export default AdminLayout