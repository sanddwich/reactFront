import { useState } from 'react'
import { Config } from '../Config/Config'
import AuthIface from '../Redux/interfaces/AdditionalInterfaces/AuthIface'
import LocalStorageReturnDataIface from '../Redux/interfaces/AdditionalInterfaces/LocalStorageReturnDataIface'
import StorageIface from '../Redux/interfaces/AdditionalInterfaces/StorageIface'

const calculateAuth = (): AuthIface => {
  let outputAuth: AuthIface = Config.defaultAuth

  const authString: string | null = window.localStorage.getItem('auth')

  try {
    if (!!authString) {
      const username: string = JSON.parse(authString).username
      const token: string = JSON.parse(authString).token
      const isAuth: boolean = JSON.parse(authString).isAuth

      outputAuth = { isAuth, token, username }
    }
  } catch (e) {
    console.warn('Ошибка: ' + e)
  }

  return outputAuth
}

export default function useLocalStorage(): LocalStorageReturnDataIface {
  const [auth, setAuth] = useState<AuthIface>(() => calculateAuth())

  const updateAuth = (authData: AuthIface) => {
    window.localStorage.setItem('auth', JSON.stringify(authData))

    setAuth((prev) => {
      return {
        ...prev,
        ...authData,
      }
    })
  }

  return {
    auth,
    authToken: auth.token,
    updateAuth,
  }
}
