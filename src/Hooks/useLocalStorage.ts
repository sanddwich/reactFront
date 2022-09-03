import { useState } from 'react'
import AuthIface from '../Redux/interfaces/AdditionalInterfaces/AuthIface'
import StorageIface from '../Redux/interfaces/AdditionalInterfaces/StorageIface'

const calculateStorage = (): StorageIface => {
  const storage = {
    auth: {
      token: '',
      isAuth: false,
    },
  }
  const authString: string | null = window.localStorage.getItem('auth')

  try {
    if (!!authString) {
      const token: string = JSON.parse(authString).token
      const isAuth: boolean = JSON.parse(authString).isAuth

      storage.auth = { isAuth, token }
    }
  } catch (e) {
    console.warn('Ошибка: ' + e)
  }

  return storage
}

export default function useLocalStorage() {
  const [storage, setStorage] = useState<StorageIface>()
}
