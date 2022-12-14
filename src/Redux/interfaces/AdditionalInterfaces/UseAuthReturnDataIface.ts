import AuthIface from "./AuthIface"

export default interface UseAuthReturnDataIface {
  auth: AuthIface
  updateAuth: (auth: AuthIface) => void
  checkAuth: () => Promise<boolean>
  test: () => void
}