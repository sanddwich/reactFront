import UserIface from './UserIface'

export default interface UseUserIface {
  users: UserIface[]
  getUsers: () => Promise<boolean>
  updateUsers: (inputUsers: UserIface[]) => void
}
