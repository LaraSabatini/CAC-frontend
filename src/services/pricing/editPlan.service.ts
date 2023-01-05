import axios from "axios"
import axiosHeader from "services/axiosHeader"
import ProductsInterface from "interfaces/content/Pricing"
import apiURL from "./route"

const editPricing = async (body: ProductsInterface) => {
  const res = await axios.put(`${apiURL}/id=${body.id}`, body, axiosHeader)
  return res.data
}

export default editPricing
