import defaultPost from "services/defaultPost"
import { LoginInterface, UserType } from "interfaces/users/General"
import apiURL from "./route"

const login = async (type: UserType, body: LoginInterface) => {
  const res = await defaultPost(`${apiURL}/${type}/login`, body)
  return res
}

export default login
