import axios from 'axios'
import { useState } from 'react'
import { useStore } from 'react-redux'
import AccessRoleIface from '../Redux/interfaces/AdditionalInterfaces/AccessRoleIface'
import BackendParamsIface from '../Redux/interfaces/AdditionalInterfaces/BackendParamsIface'
import FetchDataErrorIface from '../Redux/interfaces/AdditionalInterfaces/FetchDataErrorIface'
import UseAccessRoleIface from '../Redux/interfaces/AdditionalInterfaces/UseAccessRoleIface'
import useAuth from './useAuth'

export default function useAccessRoles(): UseAccessRoleIface {
  const defaultRoleDataError: FetchDataErrorIface = {
    isError: false,
    errorText: '',
  }
  const [accessRoles, setAccessRoles] = useState<Array<AccessRoleIface>>([])
  const [fetchAccessRolesDataError, setFetchAccessRolesDataError] = useState<FetchDataErrorIface>(defaultRoleDataError)
  const reduxStore = useStore()
  const auth = useAuth()

  const updateAccessRoles = (inputAccessRoles: AccessRoleIface[]) => {
    setAccessRoles((prev) => inputAccessRoles)
  }

  const updateFetchAccessRolesDataError = (error: FetchDataErrorIface) => {
    updateFetchAccessRolesDataErrorIsError(error.isError)
    updateFetchAccessRolesDataErrorErrorText(error.errorText)
  }

  const updateFetchAccessRolesDataErrorIsError = (val: boolean) => {
    setFetchAccessRolesDataError((prev) => {
      return { ...prev, isError: val }
    })
  }

  const updateFetchAccessRolesDataErrorErrorText = (val: string) => {
    setFetchAccessRolesDataError((prev) => {
      return { ...prev, errorText: val }
    })
  }

  const getAccessRoles = async (): Promise<any> => {
    const backendParams: BackendParamsIface = reduxStore.getState().frontApp.backendParams

    await axios({
      method: 'GET',
      url: backendParams.GET_ROLES_URL,
      headers: {
        Authorization: `Bearer_${auth.auth.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status == 200 && !!response.data) {
          console.log(response.data)
          updateFetchAccessRolesDataError(defaultRoleDataError)
          updateAccessRoles(response.data)
        } else {
          updateFetchAccessRolesDataError({ isError: true, errorText: 'Ошибка запроса. Cтатус: ' + response.status })
          updateAccessRoles([])
        }
      })
      .catch((error) => {
        console.log('Ошибка запроса: ' + error)
        updateFetchAccessRolesDataError({ isError: true, errorText: 'Ошибка запроса: ' + error })
        updateAccessRoles([])
      })
  }

  return {
    accessRoles,
    fetchAccessRolesDataError,
    getAccessRoles,
    updateAccessRoles,
  }
}
