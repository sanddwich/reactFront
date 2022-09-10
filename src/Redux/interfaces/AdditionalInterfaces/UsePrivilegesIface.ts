import FetchDataErrorIface from "./FetchDataErrorIface"
import PrivilegeIface from "./PrivilegeIface"

export default interface UsePrivilegesIface {
  privileges: PrivilegeIface[]
  fetchPrivilegesDataError: FetchDataErrorIface
  getPrivileges: () => Promise<boolean>
  updatePrivileges: (inputAccessRoles: PrivilegeIface[]) => void
}