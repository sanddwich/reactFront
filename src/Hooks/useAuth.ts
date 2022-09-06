import axios from 'axios'
import { useState } from 'react'
import { useStore } from 'react-redux'
import AuthIface from '../Redux/interfaces/AdditionalInterfaces/AuthIface'
import BackendParamsIface from '../Redux/interfaces/AdditionalInterfaces/BackendParamsIface'
import UseAuthReturnDataIface from '../Redux/interfaces/AdditionalInterfaces/UseAuthReturnDataIface'
import useLocalStorage from './useLocalStorage'
import { setFrontAppAuth } from '../Redux/actions/frontAppAction'
import { Config } from '../Config/Config'
import LocalStorageReturnDataIface from '../Redux/interfaces/AdditionalInterfaces/LocalStorageReturnDataIface'
import { AnyAction, Store } from 'redux'
import AuthCheckTokenResponseIfase from '../Redux/interfaces/AdditionalInterfaces/ResponseDataIfase'
import ResponseDataIfase from '../Redux/interfaces/AdditionalInterfaces/ResponseDataIfase'
import FormatResponse from '../Functions/FormatResponse'

const calculateAuth = (localStorage: LocalStorageReturnDataIface, reduxStore: Store<any, AnyAction>): AuthIface => {
  try {
    let reduxAuth: AuthIface = reduxStore.getState().frontApp.auth
    let localStorageAuth: AuthIface = localStorage.storage.auth

    if (reduxAuth.token != localStorageAuth.token) {
      reduxStore.dispatch(setFrontAppAuth(localStorageAuth))
    }

    return localStorageAuth
  } catch (e) {
    return Config.defaultAuth
  }
}

export default function useAuth(): UseAuthReturnDataIface {
  let localStorage = useLocalStorage()
  let reduxStore = useStore()

  const [auth, setAuth] = useState<AuthIface>(() => calculateAuth(localStorage, reduxStore))

  const checkAuth = async (): Promise<any> => {
    const message: ResponseDataIfase = await checkAuthToken()
    const tmpAuth: AuthIface = auth

    if (!!message.error) {
      console.log(message.error)
      tmpAuth.isAuth = false
    } else {
      if (!!message.data) {
        tmpAuth.isAuth = message.data.tokenIsValid
      }      
    }

    updateAuth(tmpAuth)
  }

  const checkAuthToken = async (): Promise<any> => {
    const backendParams: BackendParamsIface = reduxStore.getState().frontApp.backendParams

    const result: ResponseDataIfase = await axios({
      method: 'POST',
      url: backendParams.CHECK_TOKEN_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        token: auth.token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          return FormatResponse(response.data, null)
        } else {
          return FormatResponse(null, 'Ошибка запроса. Cтатус: ' + response.status)
        }
      })
      .catch((error) => {
        return FormatResponse(null, 'Ошибка запроса: ' + error)
      })

    return result
  }

  const updateAuth = (inputAuth: AuthIface) => {
    setAuth(prev => {
      prev = { ...inputAuth }
      console.log(prev)
      return prev
    })

    localStorage.updateAuth(inputAuth)
    reduxStore.dispatch(setFrontAppAuth(inputAuth))
  }

  const test = () => {
    console.log(reduxStore.getState().frontApp.backendParams)
  }

  return {
    auth,
    updateAuth,
    checkAuth,
    test,
  }
}
