import AuthIface from "./AuthIface";

export default interface LocalStorageReturnDataIface {
  auth: AuthIface
  authToken: string
  updateAuth: (auth: AuthIface) => void
}