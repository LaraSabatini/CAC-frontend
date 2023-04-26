import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const getPlans = async () => {
  const res = await axios.get(`${apiURL}`, axiosHeader)
  return res.data
}

export const getPlansForFilters = async () => {
  const res = await axios.get(`${apiURL}/filters`, axiosHeader)
  return res.data
}

export default getPlans
