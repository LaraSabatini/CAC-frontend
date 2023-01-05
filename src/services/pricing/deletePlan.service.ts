import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const deletePricing = async (id: number) => {
  const res = await axios.delete(`${apiURL}/id=${id}`, axiosHeader)
  return res.data
}

export default deletePricing
