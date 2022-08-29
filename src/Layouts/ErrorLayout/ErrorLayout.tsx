import React from "react"
import { Container } from "react-bootstrap"
import "./ErrorLayout.scss"

interface ErrorLayoutProps {}

const ErrorLayout = (props: ErrorLayoutProps) => {
  return (
    <Container fluid className="ErrorLayout">
      <h1>ErrorLayout</h1>
    </Container>
  )
}

export default ErrorLayout