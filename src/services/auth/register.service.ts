import defaultPost from "services/defaultPost"
import AdminInterface from "interfaces/users/Admin"
import ClientInterface from "interfaces/users/Client"
import apiURL from "./route"

const register = async (
  type: "admin" | "client",
  body: AdminInterface | ClientInterface,
) => {
  const res = await defaultPost(`${apiURL}/${type}/register`, body)
  return res
}

export default register
