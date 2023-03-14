import axios from "axios"
import axiosHeader from "services/axiosHeader"
import { UserType } from "interfaces/users/General"
import apiURL from "./route"

const getProfileData = async (type: UserType, userId: number) => {
  const res = await axios.get(`${apiURL}/${type}/id=${userId}`, axiosHeader)
  return res.data
}

const getProfileDataForTable = async (userId: number) => {
  const res = await axios.get(
    `${apiURL}/client/user_data&id=${userId}`,
    axiosHeader,
  )
  return res.data
}

export { getProfileData, getProfileDataForTable }
