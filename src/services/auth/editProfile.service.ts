import axios from "axios"
import axiosHeader from "services/axiosHeader"
import { UserType } from "interfaces/users/General"
import apiURL from "./route"

const editProfile = async (
  type: UserType,
  id: number,
  body:
    | { email: string; accessPermits: JSON }
    | {
        email: string
        name: string
        lastName: string
        identificationType: string
        identificationNumber: string
        phoneAreaCode: string
        phoneNumber: string
      },
) => {
  const res = await axios.put(`${apiURL}/${type}/id=${id}`, body, axiosHeader)
  return res.data
}

export default editProfile
