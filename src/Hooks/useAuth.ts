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
    const backendParams: BackendParamsIface = reduxStore.getState().frontApp.backendParams

    axios({
      method: 'POST',
      url: backendParams.CHECK_TOKEN_URL,
      data: {
        token: localStorage.storage.auth.token,
      },
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateAuth = (auth: AuthIface) => {
    setAuth(auth)
    localStorage.updateAuth(auth)
    reduxStore.dispatch(setFrontAppAuth(auth))
  }

  const test = () => {
    console.log(reduxStore.getState().frontApp.backendParams)
  }

  return {
    auth,
    updateAuth,
    checkAuth,
    test
  }
}
