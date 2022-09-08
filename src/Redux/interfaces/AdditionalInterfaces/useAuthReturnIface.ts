import AuthIface from "./AuthIface";
import FormDataInterface from "./FormDataInterface";

export default interface useAuthReturnIface {
  auth: AuthIface
  updateIsAuth: (isAuth: boolean) => void
  updateAuthToken: (token: string) => void
  checkToken: () => void
  updateAuth: (inputAuth: AuthIface) => void
  authorize: (userData: FormDataInterface) => Promise<boolean>
  updateUsername: (username: string) => void
}