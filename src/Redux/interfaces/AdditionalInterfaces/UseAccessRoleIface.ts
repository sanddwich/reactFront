import AccessRoleIface from "./AccessRoleIface"
import FetchDataErrorIface from "./FetchDataErrorIface"

export default interface UseAccessRoleIface {
  accessRoles: AccessRoleIface[]
  fetchAccessRolesDataError: FetchDataErrorIface
  getAccessRoles: () => Promise<boolean>
  updateAccessRoles: (inputAccessRoles: AccessRoleIface[]) => void
}
