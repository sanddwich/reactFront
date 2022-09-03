import AuthIface from "./AuthIface";
import StorageIface from "./StorageIface";

export default interface LocalStorageReturnDataIface {
  storage: StorageIface
  updateAuth: (auth: AuthIface) => void
}