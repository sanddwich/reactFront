import axios from 'axios'
import { useState } from 'react'
import { useStore } from 'react-redux'
import BackendParamsIface from '../Redux/interfaces/AdditionalInterfaces/BackendParamsIface'
import UserIface from '../Redux/interfaces/AdditionalInterfaces/UserIface'
import UseUserIface from '../Redux/interfaces/AdditionalInterfaces/UseUserIface'
import useAuth from './useAuth'

export default function useUsers(): UseUserIface {
  const [users, setUsers] = useState<Array<UserIface>>([])
  const reduxStore = useStore()
  const auth = useAuth()

  const updateUsers = (inputUsers: UserIface[]) => {
    setUsers((prev) => inputUsers)
  }

  const getUsers = async (): Promise<boolean> => {
    const backendParams: BackendParamsIface = reduxStore.getState().frontApp.backendParams

    const result: boolean = await axios({
      method: 'GET',
      url: backendParams.GET_USER_URL,
      headers: {
        'Authorization': `Bearer_${auth.auth.token}`,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status == 200 && !!response.data) {
          updateUsers(response.data)
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

  return {
    users,
    getUsers,
    updateUsers
  }
}
