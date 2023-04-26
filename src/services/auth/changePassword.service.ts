import axios from "axios"
import axiosHeader from "services/axiosHeader"
import { ChangePasswordInterface, UserType } from "interfaces/users/General"
import apiURL from "./route"

const changePassword = async (
  type: UserType,
  body: ChangePasswordInterface,
  encrypted: boolean,
) => {
  const res = await axios.put(
    `${apiURL}/${type}/change-password&encrypted=${encrypted}`,
    body,
    axiosHeader,
  )
  return res
}

export default changePassword
