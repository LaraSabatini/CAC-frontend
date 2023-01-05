import axios from "axios"
import axiosHeader from "services/axiosHeader"
import { ChangePasswordInterface } from "interfaces/users/General"
import apiURL from "./route"

const changePassword = async (
  type: "client" | "admin",
  body: ChangePasswordInterface,
) => {
  const res = await axios.put(
    `${apiURL}/${type}/change-password`,
    body,
    axiosHeader,
  )
  return res.data
}

export default changePassword
