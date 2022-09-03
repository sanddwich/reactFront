import { SET_FRONTAPP_AUTH, SET_FRONTAPP_LOADING, SET_FRONTAPP_MESSAGE } from "../constants/ActionTypes"
import AuthIface from "./AdditionalInterfaces/AuthIface"
import MessageIface from "./AdditionalInterfaces/MessageIface"

interface setFrontAppLoading {
  type: typeof SET_FRONTAPP_LOADING
  loading: boolean
}

interface setFrontAppMessage {
  type: typeof SET_FRONTAPP_MESSAGE
  message: MessageIface
}

interface setFrontAppAuth {
  type: typeof SET_FRONTAPP_AUTH
  auth: AuthIface
}

export type FrontAppActionType =
  | setFrontAppLoading
  | setFrontAppMessage
  | setFrontAppAuth