import AuthIface from "../Redux/interfaces/AdditionalInterfaces/AuthIface"

interface ConfigInterface {
  backendURL: string
  defaultAuth: AuthIface
}

export const Config: ConfigInterface = {
  backendURL: "http://localhost:8088/",
  defaultAuth: {
    username: "",
    isAuth: false,
    token: ""
    // token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwicHJpdmlsZWdlcyI6WyJVU0VSIiwiUkVTVF9BUElfR0VUIl0sImlhdCI6MTY2MjE5ODkxNywiZXhwIjoxNjYyMjQyMTE3fQ._Td3NlduJ33pu5nQRnQNPHMRu_8EYKhfLGAJZPXw_yE123"
  },
}