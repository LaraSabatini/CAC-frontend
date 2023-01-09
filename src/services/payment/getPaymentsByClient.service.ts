import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const getPaymentsByClient = async (clientId: number) => {
  const res = await axios.get(`${apiURL}/search/id=${clientId}`, axiosHeader)
  return res.data
}

export default getPaymentsByClient
