import axios from "axios"
import axiosHeader from "services/axiosHeader"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/admins`

const getAdminName = async (id: number) => {
  const res = await axios.get(`${apiURL}/id=${id}`, axiosHeader)
  return res.data
}

export const editData = async (body: {
  id: number
  email: string
  userName: string
}) => {
  const res = await axios.put(`${apiURL}`, body, axiosHeader)
  return res.data
}

export default getAdminName
