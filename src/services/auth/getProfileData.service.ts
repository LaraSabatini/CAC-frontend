import axios from "axios"
import axiosHeader from "services/axiosHeader"
import { UserType } from "interfaces/users/General"
import apiURL from "./route"

const getProfileData = async (type: UserType, userId: number) => {
  const res = await axios.get(`${apiURL}/${type}/id=${userId}`, axiosHeader)
  return res.data
}

const getProfileDataForTable = async (page: number) => {
  const res = await axios.get(
    `${apiURL}/client/user_data&page=${page}`,
    axiosHeader,
  )
  return res
}

export { getProfileData, getProfileDataForTable }
