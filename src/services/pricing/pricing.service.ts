import axios from "axios"
import axiosHeader from "services/axiosHeader"
import ProductsInterface from "interfaces/content/Pricing"
import defaultPost from "../defaultPost"

const apiURL = "http://localhost:3001/pricing"

const getPricing = async () => {
  const res = await axios.get(`${apiURL}`, axiosHeader)
  return res.data
}

const createPricing = async (body: ProductsInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

const deletePricing = async (id: number) => {
  const res = await axios.delete(`${apiURL}/${id}`, axiosHeader)
  return res.data
}

const editPricing = async (body: ProductsInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

export { createPricing, editPricing, deletePricing, getPricing }
