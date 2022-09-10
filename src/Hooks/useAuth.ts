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
import FormDataInterface from '../Redux/interfaces/AdditionalInterfaces/FormDataInterface'
import { LayoutTextWindowReverse } from 'react-bootstrap-icons'

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

  const updateUsername = (username: string) => {
    setAuth((prev) => {
      return {
        ...prev,
        username,
      }
    })
  }

  const authorize = async (userData: FormDataInterface): Promise<boolean> => {
    const backendParams: BackendParamsIface = reduxStore.getState().frontApp.backendParams

    let result: boolean = await axios({
      method: 'POST',
      url: backendParams.AUTH_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...userData,
      },
    })
      .then((response) => {
        if (response.status == 200 && !!response.data) {
          // console.log(response)

          updateAuth({
            ...response.data,
            isAuth: true
          })
          
          return true
        } else {
          console.log('Ошибка запроса. Cтатус: ' + response.status)
          return false
        }
      })
      .catch((error) => {
        console.log('Ошибка запроса: ' + error)
        return false
      })

    return result
  }

  const updateAuthTest = (inputAuth:AuthIface) => {
    setAuth(prev => {
      return {
        ...prev,
        username: inputAuth.username,
        token: inputAuth.token,
        isAuth: inputAuth.isAuth,
      }
    })
    console.log(inputAuth)
    console.log(auth)
  }

  const updateAuth = (inputAuth: AuthIface) => {
    // updateAuthTest(inputAuth)
    updateAuthToken(inputAuth.token)
    updateUsername(inputAuth.username)
    updateIsAuth(inputAuth.isAuth)

    reduxStore.dispatch(
      setFrontAppAuth({
        ...auth,
        ...inputAuth,
      })
    )

    localStorage.updateAuth(inputAuth)
  }

  const updateAuthToken = (token: string) => {
    setAuth((prev) => {
      return {
        ...prev,
        token,
      }
    })
  }

  const checkToken = () => {
    const backendParams: BackendParamsIface = reduxStore.getState().frontApp.backendParams

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
          if (!!response.data)
            updateAuth({
              ...auth,
              isAuth: response.data.tokenIsValid,
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
    authorize,
    updateUsername
  }
}
