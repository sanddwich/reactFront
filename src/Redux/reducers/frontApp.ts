import { Config } from "../../Config/Config"
import { SET_FRONTAPP_AUTH, SET_FRONTAPP_LOADING, SET_FRONTAPP_MESSAGE } from "../constants/ActionTypes"
import { FrontAppActionType } from "../interfaces/FrontAppActionType"
import { FrontAppState } from "../interfaces/interfaces"

const initialState: FrontAppState = {
  auth: Config.defaultAuth,
  backendParams: {
    AUTH_URL: Config.backendURL + "api/auth/login",
    CHECK_TOKEN_URL: Config.backendURL + "api/auth/check_token",
    GET_PRIVILEGES_URL: Config.backendURL + "api/developer/privileges",
    GET_ROLES_URL: Config.backendURL + "api/developer/roles",
    GET_USER_URL: Config.backendURL + "api/developer/users"
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