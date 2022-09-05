import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import useLocalStorage from '../../Hooks/useLocalStorage'
import { RootState } from '../../Redux'
import AuthIface from '../../Redux/interfaces/AdditionalInterfaces/AuthIface'
import {setFrontAppAuth, setFrontAppLoading, setFrontAppMessage} from '../../Redux/actions/frontAppAction'
import './Hooks.scss'
import MessageIface from '../../Redux/interfaces/AdditionalInterfaces/MessageIface'
import { FrontAppState } from '../../Redux/interfaces/interfaces'
import { useStore } from 'react-redux'
import useAuth from '../../Hooks/useAuth'

interface HooksProps {
  // frontApp: FrontAppState
  // setFrontAppAuth: (auth: AuthIface) => void
  // setFrontAppLoading: (loading: boolean) => void
  // setFrontAppMessage: (message: MessageIface) => void
}

const Hooks = (props: HooksProps) => {
  const localStorage = useLocalStorage()
  const store = useStore()
  const auth = useAuth()

  const GetAuth = () => {
    auth.checkAuth()
  }
  
  const SetAuth = () => {
    const newAuth: AuthIface = {
      username: "username",
      isAuth: true,
      token: "token"
    }

    // localStorage.updateAuth(newAuth)

    store.dispatch(setFrontAppAuth(newAuth))
    
    console.log(store.getState().frontApp.auth)
  }

  return (
    <Container fluid className="Hooks">
      <h1>Hooks</h1>

      <p>{`Auth: ${JSON.stringify(store.getState().frontApp.auth, null,)}`}</p>

      <button className="btn btn-primary" style={{marginRight: 5}} onClick={GetAuth}>GetAuth</button>
      <button className="btn btn-success" onClick={SetAuth}>SetAuth</button>
    </Container>
  )
}


const mapDispatchToProps = {
  // setFrontAppAuth,
  // setFrontAppLoading,
  // setFrontAppMessage
}

const mapStateToProps = (state: RootState) => {
  const frontApp = state.frontApp
  return {
    frontApp,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hooks)