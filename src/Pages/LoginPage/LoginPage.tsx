import React from 'react'
import { Container } from 'react-bootstrap'
import { ArrowDownCircle } from 'react-bootstrap-icons'
import { Location, useLocation } from 'react-router-dom'
import './LoginPage.scss'

interface LoginPageProps {}

const LoginPage = (prps: LoginPageProps) => {  
  const location: Location = useLocation()
  const from = location.pathname
  
  console.log("From: " + from)

  return (
    <Container fluid className="LoginPage p-0">
      <h1>LoginPage</h1>
    </Container> 
  )
}

export default LoginPage