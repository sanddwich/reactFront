import { useEffect } from "react"
import { useLocation, useNavigate, Navigate, useParams, Location, Params, NavigateFunction } from "react-router-dom"
import useAuth from "../Hooks/useAuth"

interface AuthCheckProps {
  // children: React.ReactNode
  children: JSX.Element
}

const AuthCheck = (props: AuthCheckProps) => {
  const location: Location = useLocation()
  const params: Readonly<Params<string>> = useParams()
  const navigate: NavigateFunction = useNavigate()
  const auth = useAuth()

  if (!auth.auth.isAuth) return <Navigate to="/auth" state={{from: location}} />

  return props.children
}

export default AuthCheck