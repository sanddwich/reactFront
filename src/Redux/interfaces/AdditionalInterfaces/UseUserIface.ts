import FetchDataErrorIface from './FetchDataErrorIface'
import UserIface from './UserIface'

export default interface UseUserIface {
  users: UserIface[]
  fetchUserDataError: FetchDataErrorIface
  getUsers: () => Promise<boolean>
  updateUsers: (inputUsers: UserIface[]) => void
}
