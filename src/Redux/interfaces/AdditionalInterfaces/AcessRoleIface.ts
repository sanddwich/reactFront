import PrivilegeIface from './PrivilegeIface'

export default interface AcessRoleIface {
  name: string
  code: string
  description: string
  privileges: PrivilegeIface[]
}
