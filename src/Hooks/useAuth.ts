import { useState } from 'react'
import { useStore } from 'react-redux'
import { AnyAction, Store } from 'redux'
import { Config } from '../Config/Config'
import AuthIface from '../Redux/interfaces/AdditionalInterfaces/AuthIface'
import LocalStorageReturnDataIface from '../Redux/interfaces/AdditionalInterfaces/LocalStorageReturnDataIface'
import StorageIface from '../Redux/interfaces/AdditionalInterfaces/StorageIface'
import useLocalStorage from './useLocalStorage'
import { setFrontAppAuth } from '../Redux/actions/frontAppAction'
import BackendParamsIface from '../Redux/interfaces/AdditionalInterfaces/BackendParamsIface'
import axios from 'axios'
import ResponseDataIfase from '../Redux/interfaces/AdditionalInterfaces/ResponseDataIfase'
import FormatResponse from '../Functions/FormatResponse'
import useAuthReturnIface from '../Redux/interfaces/AdditionalInterfaces/useAuthReturnIface'

export default function useAuth(): useAuthReturnIface {
  const localStorage = useLocalStorage()
  const reduxStore = useStore()

  const [auth, setAuth] = useState<AuthIface>(localStorage.storage.auth)

  const updateIsAuth = (isAuth: boolean) => {
    setAuth((prev) => {
      return {
        ...prev,
        isAuth,
      }
    })
  }

  const updateAuthToken = (token: string) => {
    setAuth((prev) => {
      return {
        ...prev,
        token,
      }
    })
  }

  const updateAuthAtLocalStorageAndReduxStore = () => {
    localStorage.updateAuth(auth)
    reduxStore.dispatch(setFrontAppAuth(auth))
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
          if (!!response.data) updateIsAuth(response.data.tokenIsValid)
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
    checkToken
  }
}
