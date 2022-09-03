import { useState } from "react";
import AuthIface from "../Redux/interfaces/AdditionalInterfaces/AuthIface";
import UseAuthReturnDataIface from "../Redux/interfaces/AdditionalInterfaces/UseAuthReturnDataIface";
import frontApp from "../Redux/reducers/frontApp";



export default function useAuth(): UseAuthReturnDataIface {
  const [auth, setAuth] = useState<AuthIface>()

  return {}
}