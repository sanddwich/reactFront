import axios from "axios"
import { useState } from "react"
import { useStore } from "react-redux"
import BackendParamsIface from "../Redux/interfaces/AdditionalInterfaces/BackendParamsIface"
import FetchDataErrorIface from "../Redux/interfaces/AdditionalInterfaces/FetchDataErrorIface"
import PrivilegeIface from "../Redux/interfaces/AdditionalInterfaces/PrivilegeIface"
import UsePrivilegesIface from "../Redux/interfaces/AdditionalInterfaces/UsePrivilegesIface"
import useAuth from "./useAuth"

export default function usePrivileges(): UsePrivilegesIface {
  const defaultPrivilegeDataError: FetchDataErrorIface = {
    isError: false,
    errorText: '',
  }
  const [privileges, setPrivileges] = useState<Array<PrivilegeIface>>([])
  const [fetchPrivilegesDataError, setFetchPrivilegesDataError] = useState<FetchDataErrorIface>(defaultPrivilegeDataError)
  const reduxStore = useStore()
  const auth = useAuth()

  const updatePrivileges = (inputPrivileges: PrivilegeIface[]) => {
    setPrivileges((prev) => inputPrivileges)
  }

  const updateFetchPrivilegesDataError = (error: FetchDataErrorIface) => {
    updateFetchPrivilegesDataErrorIsError(error.isError)
    updateFetchPrivilegesDataErrorText(error.errorText)
  }

  const updateFetchPrivilegesDataErrorIsError = (val: boolean) => {
    setFetchPrivilegesDataError((prev) => {
      return { ...prev, isError: val }
    })
  }

  const updateFetchPrivilegesDataErrorText = (val: string) => {
    setFetchPrivilegesDataError((prev) => {
      return { ...prev, errorText: val }
    })
  }

  const getPrivileges= async (): Promise<any> => {
    const backendParams: BackendParamsIface = reduxStore.getState().frontApp.backendParams

    await axios({
      method: 'GET',
      url: backendParams.GET_PRIVILEGES_URL,
      headers: {
        Authorization: `Bearer_${auth.auth.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status == 200 && !!response.data) {
          console.log(response.data)
          updateFetchPrivilegesDataError(defaultPrivilegeDataError)
          updatePrivileges(response.data)
        } else {
          updateFetchPrivilegesDataError({ isError: true, errorText: 'Ошибка запроса. Cтатус: ' + response.status })
          updatePrivileges([])
        }
      })
      .catch((error) => {
        console.log('Ошибка запроса: ' + error)
        updateFetchPrivilegesDataError({ isError: true, errorText: 'Ошибка запроса: ' + error })
        updatePrivileges([])
      })
  }

  return {
    privileges,
    fetchPrivilegesDataError,
    getPrivileges,
    updatePrivileges,
  }
}