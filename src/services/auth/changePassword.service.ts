import axios from "axios"
import axiosHeader from "services/axiosHeader"
import { ChangePasswordInterface, UserType } from "interfaces/users/General"
import apiURL from "./route"

const changePassword = async (
  type: UserType,
  body: ChangePasswordInterface,
  encrypted: boolean,
) => {
  try {
    const res = await axios.put(
      `${apiURL}/${type}/change-password&encrypted=${encrypted}`,
      body,
      axiosHeader,
    )
    return res.data
  } catch (err: any) {
    return err.response.status
  }
}

export default changePassword
