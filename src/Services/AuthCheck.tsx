import { useLocation, useNavigate, Navigate, useParams, Location, Params, NavigateFunction } from "react-router-dom"

interface AuthCheckProps {
  // children: React.ReactNode
  children: JSX.Element
}

const AuthCheck = (props: AuthCheckProps) => {
  const location: Location = useLocation()
  const params: Readonly<Params<string>> = useParams()
  const navigate: NavigateFunction = useNavigate()

  const auth = true

  if (!auth) return <Navigate to="/auth" state={{from: location}} />

  return props.children
}

export default AuthCheck