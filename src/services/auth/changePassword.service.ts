import axios from "axios"
import axiosHeader from "services/axiosHeader"

const apiURL = "/users/"

const changePassword = async (
  type: "admin" | "client",
  body: { id: number; newPassword: string },
) => {
  const res = await axios.put(
    `${apiURL}${type}/change-password`,
    body,
    axiosHeader,
  )
  return res.data
}

export default changePassword
