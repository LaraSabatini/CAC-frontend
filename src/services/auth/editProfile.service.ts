import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const editProfile = async (
  type: "client" | "admin",
  id: number,
  body:
    | { email: string; accessPermits: JSON } // admin
    | {
        email: string
        name: string
        lastName: string
        identificationType: string
        identificationNumber: string
        phoneAreaCode: string
        phoneNumber: string
      }, // client
) => {
  const res = await axios.put(`${apiURL}/${type}/id=${id}`, body, axiosHeader)
  return res.data
}

export default editProfile
