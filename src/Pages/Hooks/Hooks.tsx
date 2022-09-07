import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import useLocalStorage from '../../Hooks/useLocalStorage'
import { RootState } from '../../Redux'
import AuthIface from '../../Redux/interfaces/AdditionalInterfaces/AuthIface'
import { setFrontAppAuth, setFrontAppLoading, setFrontAppMessage } from '../../Redux/actions/frontAppAction'
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

  return (
    <Container fluid className="Hooks">
      <h1>Hooks</h1>

      <p>{`Token: ${auth.auth.token.length > 50 ? auth.auth.token.substring(0, 50) + "..." : auth.auth.token}`}</p>
      <hr />
      <p>{`Auth: ${auth.auth.isAuth}`}</p>

      <button className="btn btn-primary" style={{ marginRight: 5 }} onClick={() => auth.updateAuthToken('token')}>
        SetFalseTokenAuth
      </button>

      <button
        className="btn btn-primary"
        style={{ marginRight: 5 }}
        onClick={() =>
          auth.updateAuthToken(
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwicHJpdmlsZWdlcyI6WyJVU0VSIiwiUkVTVF9BUElfR0VUIl0sImlhdCI6MTY2MjU1NjE0OSwiZXhwIjoxNjYyNTk5MzQ5fQ.UPqoB8Q0JPzzemSpWnYchPDxFm21ilkO46psINkXE3g'
          )
        }
      >
        SetTrueTokenAuth
      </button>

      <button className="btn btn-success" onClick={() => {
        auth.checkToken()
      }}>
        CheckToken
      </button>
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
