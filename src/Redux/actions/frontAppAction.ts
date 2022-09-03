import { SET_FRONTAPP_AUTH, SET_FRONTAPP_LOADING, SET_FRONTAPP_MESSAGE } from "../constants/ActionTypes";
import AuthIface from "../interfaces/AdditionalInterfaces/AuthIface";
import MessageIface from "../interfaces/AdditionalInterfaces/MessageIface";

export const setFrontAppLoading = (loading: boolean) => ({
  type: SET_FRONTAPP_LOADING,
  loading,
})

export const setFrontAppMessage = (message: MessageIface) => ({
  type: SET_FRONTAPP_MESSAGE,
  message,
})

export const setFrontAppAuth = (auth: AuthIface) => ({
  type: SET_FRONTAPP_AUTH,
  auth,
})