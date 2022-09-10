import PrivilegeIface from './PrivilegeIface'

export default interface AccessRoleIface {
  name: string
  code: string
  description: string
  privileges: PrivilegeIface[]
}
