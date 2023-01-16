import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const getProfileData = async (type: "client" | "admin", userId: number) => {
  const res = await axios.get(`${apiURL}/${type}/id=${userId}`, axiosHeader)
  return res.data
}

export default getProfileData
