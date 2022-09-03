import React from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import useLocalStorage from '../../Hooks/useLocalStorage'
import { RootState } from '../../Redux'
import AuthIface from '../../Redux/interfaces/AdditionalInterfaces/AuthIface'
import {setFrontAppAuth, setFrontAppLoading, setFrontAppMessage} from '../../Redux/actions/frontAppAction'
import './Hooks.scss'
import MessageIface from '../../Redux/interfaces/AdditionalInterfaces/MessageIface'
import { FrontAppState } from '../../Redux/interfaces/interfaces'

interface HooksProps {
  frontApp: FrontAppState
  setFrontAppAuth: (auth: AuthIface) => void
  setFrontAppLoading: (loading: boolean) => void
  setFrontAppMessage: (message: MessageIface) => void
}

const Hooks = (props: HooksProps) => {
  const localStorage = useLocalStorage()

  const GetAuth = () => {
    console.log(localStorage.storage)
  }
  
  const SetAuth = () => {
    const newAuth: AuthIface = {
      isAuth: true,
      token: "token"
    }

    localStorage.updateAuth(newAuth)
    
    console.log(localStorage.storage)
  }

  return (
    <Container fluid className="Hooks">
      <h1>Hooks</h1>
      <button className="btn btn-primary" style={{marginRight: 5}} onClick={GetAuth}>GetAuth</button>
      <button className="btn btn-success" onClick={SetAuth}>SetAuth</button>
    </Container>
  )
}


const mapDispatchToProps = {
  setFrontAppAuth,
  setFrontAppLoading,
  setFrontAppMessage
}

const mapStateToProps = (state: RootState) => {
  const frontApp = state.frontApp
  return {
    frontApp,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hooks)