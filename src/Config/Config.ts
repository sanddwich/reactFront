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
    token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwicHJpdmlsZWdlcyI6WyJVU0VSIiwiUkVTVF9BUElfR0VUIl0sImlhdCI6MTY2MjQ3Mjg4NiwiZXhwIjoxNjYyNTE2MDg2fQ.VHnTnpdfBH2BCYX06Oby6GKOfD27TvsRfGWnT6Hdz98"
    // token: ""
  },
}