import AuthIface from "./AuthIface";

export default interface LocalStorageReturnDataIface {
  auth: AuthIface
  updateAuth: (auth: AuthIface) => void
}