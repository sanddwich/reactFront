import { useState } from 'react'
import { useStore } from 'react-redux'
import AuthIface from '../Redux/interfaces/AdditionalInterfaces/AuthIface'
import useLocalStorage from './useLocalStorage'
import { setFrontAppAuth } from '../Redux/actions/frontAppAction'
import BackendParamsIface from '../Redux/interfaces/AdditionalInterfaces/BackendParamsIface'
import axios from 'axios'
import ResponseDataIfase from '../Redux/interfaces/AdditionalInterfaces/ResponseDataIfase'
import useAuthReturnIface from '../Redux/interfaces/AdditionalInterfaces/useAuthReturnIface'
import LocalStorageReturnDataIface from '../Redux/interfaces/AdditionalInterfaces/LocalStorageReturnDataIface'

const calculateAuth = (localStorage: LocalStorageReturnDataIface): AuthIface => {
  return localStorage.auth
}

export default function useAuth(): useAuthReturnIface {
  const localStorage = useLocalStorage()
  const reduxStore = useStore()

  const [auth, setAuth] = useState<AuthIface>(calculateAuth(localStorage))

  const updateIsAuth = (isAuth: boolean) => {
    setAuth((prev) => {
      return {
        ...prev,
        isAuth,
      }
    })
  }

  const updateAuth = (inputAuth: AuthIface) => {
    setAuth((prev) => {
      return {
        ...prev,
        ...inputAuth,
      }
    })

    updateAuthAtLocalStorageAndReduxStore(inputAuth)
  }

  const updateAuthToken = (token: string) => {
    setAuth((prev) => {
      return {
        ...prev,
        token,
      }
    })
  }

  const updateAuthAtLocalStorageAndReduxStore = (inputAuth: AuthIface) => {
    localStorage.updateAuth({
      ...auth,
      ...inputAuth,
    })
    reduxStore.dispatch(
      setFrontAppAuth({
        ...auth,
        ...inputAuth,
      })
    )
  }

  const checkToken = () => {
    const backendParams: BackendParamsIface = reduxStore.getState().frontApp.backendParams
    let result: ResponseDataIfase

    axios({
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
          if (!!response.data) updateAuth({
            ...auth,
            isAuth: response.data.tokenIsValid
          })
        } else {
          console.log('Ошибка запроса. Cтатус: ' + response.status)
        }
      })
      .catch((error) => {
        console.log('Ошибка запроса: ' + error)
      })
  }

  return {
    auth: { ...auth },
    updateIsAuth,
    updateAuthToken,
    checkToken,
    updateAuth,
  }
}
