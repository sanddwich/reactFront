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

<<<<<<< HEAD
  const updateIsAuth = (isAuth: boolean) => {
    setAuth((prev) => {
      return {
        ...prev,
        isAuth,
      }
    })
=======
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
>>>>>>> e71bfc65f352f26af0d5f582c8d347fd425a8ace
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
<<<<<<< HEAD
=======

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
>>>>>>> e71bfc65f352f26af0d5f582c8d347fd425a8ace
  }

  return {
    auth: { ...auth },
    updateIsAuth,
    updateAuthToken,
    checkToken
  }
}
