import axios from "axios"
import axiosHeader from "services/axiosHeader"
import defaultPost from "../defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/filters`

const getFilters = async () => {
  const res = await axios.get(`${apiURL}`, axiosHeader)
  return res.data
}

const createFilter = async (body: { value: string }) => {
  const res = await defaultPost(apiURL, body)
  return res
}

const deleteFilter = async (id: number) => {
  const res = await axios.delete(`${apiURL}/id=${id}`, axiosHeader)
  return res.data
}

export { createFilter, getFilters, deleteFilter }
