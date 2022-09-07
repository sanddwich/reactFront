import { useState } from 'react'
import { Config } from '../Config/Config'
import AuthIface from '../Redux/interfaces/AdditionalInterfaces/AuthIface'
import LocalStorageReturnDataIface from '../Redux/interfaces/AdditionalInterfaces/LocalStorageReturnDataIface'
import StorageIface from '../Redux/interfaces/AdditionalInterfaces/StorageIface'

const calculateAuth = (): AuthIface => {
  let auth: AuthIface = Config.defaultAuth

  const authString: string | null = window.localStorage.getItem('auth')

  try {
    if (!!authString) {
      const username: string = JSON.parse(authString).username
      const token: string = JSON.parse(authString).token
      const isAuth: boolean = JSON.parse(authString).isAuth

      auth = { isAuth, token, username }
    }
  } catch (e) {
    console.warn('Ошибка: ' + e)
  }

  return auth
}

export default function useLocalStorage(): LocalStorageReturnDataIface {
  const [auth, setAuth] = useState<AuthIface>(() => calculateAuth())

  const updateAuth = (authData: AuthIface) => {
    setAuth(prev => {
      const updateData: AuthIface = {
        ...prev,
        ...authData,
      }

      console.log(updateData)

      window.localStorage.setItem('auth', JSON.stringify(updateData))

      return updateData
    })
  }

  return {
    auth,
    updateAuth,
  }
}
