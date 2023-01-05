import defaultPost from "services/defaultPost"
import { LoginInterface } from "interfaces/users/General"
import apiURL from "./route"

const login = async (type: "admin" | "client", body: LoginInterface) => {
  const res = await defaultPost(`${apiURL}/${type}/login`, body)
  return res
}

export default login
