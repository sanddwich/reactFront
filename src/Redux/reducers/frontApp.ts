import { SET_FRONTAPP_AUTH, SET_FRONTAPP_LOADING, SET_FRONTAPP_MESSAGE } from "../constants/ActionTypes"
import { FrontAppActionType } from "../interfaces/FrontAppActionType"
import { FrontAppState } from "../interfaces/interfaces"

const initialState: FrontAppState = {
  auth: {
    isAuth: false,
    token: ""
  },
  backendParams: {
    AUTH_URL: "",
    GET_PRIVILEGES_URL: "",
    GET_ROLES_URL: "",
    GET_USER_URL: ""
  },
  loading: false,
  message: {
    isError: false,
    message: ""
  }
}

const frontApp = (state: FrontAppState = initialState, action: FrontAppActionType) => {
  switch (action.type) {
    case SET_FRONTAPP_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    case SET_FRONTAPP_AUTH:
      return {
        ...state,
        auth: action.auth
      }
    case SET_FRONTAPP_MESSAGE:
      return {
        ...state,
        message: action.message
      }
    default:
      return state
  }
}

export default frontApp