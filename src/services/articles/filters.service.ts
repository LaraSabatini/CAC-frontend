import axios from "axios"
import axiosHeader from "services/axiosHeader"
import { FilterType } from "interfaces/content/Article"
import defaultPost from "../defaultPost"

const apiURL = "http://localhost:3001/software/api/filters"

const getFilters = async (type: FilterType) => {
  const res = await axios.get(`${apiURL}/type=${type}`, axiosHeader)
  return res.data
}

const createFilter = async (body: { value: string; type: FilterType }) => {
  const res = await defaultPost(apiURL, body)
  return res
}

const deleteFilter = async (id: number, type: FilterType) => {
  const res = await axios.delete(`${apiURL}/id=${id}&type=${type}`, axiosHeader)
  return res.data
}

export { createFilter, getFilters, deleteFilter }
