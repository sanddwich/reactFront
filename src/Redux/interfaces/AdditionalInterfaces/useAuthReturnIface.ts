import AuthIface from "./AuthIface";

export default interface useAuthReturnIface {
  auth: AuthIface
  updateIsAuth: (isAuth: boolean) => void
  updateAuthToken: (token: string) => void
  checkToken: () => void
}