import axios from "axios"
import axiosHeader from "services/axiosHeader"
import ProductsInterface from "interfaces/products/products"
import defaultPost from "../defaultPost"

const apiURL = "/products"

const getProducts = async () => {
  const res = await axios.get(`${apiURL}/`, axiosHeader)
  return res.data
}

const createProduct = async (body: ProductsInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

const deleteProduct = async (id: number) => {
  const res = await axios.delete(`${apiURL}/${id}`, axiosHeader)
  return res.data
}

const editProduct = async (body: ProductsInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

export { createProduct, editProduct, deleteProduct, getProducts }
