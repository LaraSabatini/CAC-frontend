import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const getPlans = async () => {
  try {
    const res = await axios.get(`${apiURL}`, axiosHeader)
    return res.data
  } catch (err: any) {
    return err.response.status
  }
}
export default getPlans
