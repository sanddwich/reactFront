import React from "react"
import { Container } from "react-bootstrap"
import { Outlet } from "react-router"
import AdminBody from "./AdminBody/AdminBody"
import AdminFooter from "./AdminFooter/AdminFooter"
import AdminHeader from "./AdminHeader/AdminHeader"
import "./AdminLayout.scss"

interface AdminLayoutProps {}

const AdminLayout = (props: AdminLayoutProps) => {
  return (
    <Container fluid className="AdminLayout p-0">
      <AdminHeader />

      <AdminBody>
        <Outlet />
      </AdminBody>

      <AdminFooter />
    </Container>
  )
}

export default AdminLayout