import { useState } from 'react'
import AuthIface from '../Redux/interfaces/AdditionalInterfaces/AuthIface'
import LocalStorageReturnDataIface from '../Redux/interfaces/AdditionalInterfaces/LocalStorageReturnDataIface'
import StorageIface from '../Redux/interfaces/AdditionalInterfaces/StorageIface'

const calculateStorage = (): StorageIface => {
  const storage: StorageIface = {
    auth: {
      token: '',
      isAuth: false,
    },
  }

  const authString: string | null = window.localStorage.getItem('data')

  try {
    if (!!authString) {
      const token: string = JSON.parse(authString).auth.token
      const isAuth: boolean = JSON.parse(authString).auth.isAuth

      storage.auth = { isAuth, token }
    }
  } catch (e) {
    console.warn('Ошибка: ' + e)
  }

  return storage
}

export default function useLocalStorage(): LocalStorageReturnDataIface {
  const [storage, setStorage] = useState<StorageIface>(() => calculateStorage())

  const updateAuth = (authData: AuthIface) => {
    setStorage(prev => {
      prev.auth = authData
      window.localStorage.setItem('data', JSON.stringify(prev))

      return prev
    })
  }

  return {
    storage,
    updateAuth
  }
}