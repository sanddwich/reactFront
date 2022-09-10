import axios from 'axios'
import { useState } from 'react'
import { useStore } from 'react-redux'
import BackendParamsIface from '../Redux/interfaces/AdditionalInterfaces/BackendParamsIface'
import FetchDataErrorIface from '../Redux/interfaces/AdditionalInterfaces/FetchDataErrorIface'
import UserIface from '../Redux/interfaces/AdditionalInterfaces/UserIface'
import UseUserIface from '../Redux/interfaces/AdditionalInterfaces/UseUserIface'
import useAuth from './useAuth'

export default function useUsers(): UseUserIface {
  const defaultUserDataError: FetchDataErrorIface = {
    isError: false,
    errorText: '',
  }
  const [users, setUsers] = useState<Array<UserIface>>([])
  const [fetchUserDataError, setFetchUserDataError] = useState<FetchDataErrorIface>(defaultUserDataError)
  const reduxStore = useStore()
  const auth = useAuth()

  const updateUsers = (inputUsers: UserIface[]) => {
    setUsers((prev) => inputUsers)
  }

  const updateFetchUserDataError = (error: FetchDataErrorIface) => {
    updateFetchUserDataErrorIsError(error.isError)
    updateFetchUserDataErrorErrorText(error.errorText)
  }

  const updateFetchUserDataErrorIsError = (val: boolean) => {
    setFetchUserDataError((prev) => {
      return { ...prev, isError: val }
    })
  }

  const updateFetchUserDataErrorErrorText = (val: string) => {
    setFetchUserDataError((prev) => {
      return { ...prev, errorText: val }
    })
  }

  const getUsers = async (): Promise<any> => {
    const backendParams: BackendParamsIface = reduxStore.getState().frontApp.backendParams

    await axios({
      method: 'GET',
      url: backendParams.GET_USER_URL,
      headers: {
        Authorization: `Bearer_${auth.auth.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status == 200 && !!response.data) {
          console.log(response.data)
          updateFetchUserDataError(defaultUserDataError)
          updateUsers(response.data)
          console.log(fetchUserDataError)
        } else {
          updateFetchUserDataError({ isError: true, errorText: 'Ошибка запроса. Cтатус: ' + response.status })
          updateUsers([])
          console.log(fetchUserDataError)
        }
      })
      .catch((error) => {
        console.log('Ошибка запроса: ' + error)
        updateFetchUserDataError({ isError: true, errorText: 'Ошибка запроса: ' + error })
        updateUsers([])
      })
  }

  return {
    users,
    fetchUserDataError,
    getUsers,
    updateUsers,
  }
}
