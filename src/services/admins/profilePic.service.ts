import axios from "axios"
import axiosHeader from "services/axiosHeader"

const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/admins`

const uploadPic = async (formData: any, id: number) => {
  try {
    const res = await axios.post(`${apiURL}/id=${id}`, formData)
    return res
  } catch (ex) {
    return ex
  }
}

const getProfilePic = async (id: number, name: string) => {
  const res = await axios.get(
    `${apiURL}/profile-pic/id=${id}&name=${name}`,
    axiosHeader,
  )
  return res.data
}

export const removeProfilePic = async (id: number) => {
  const res = await axios.put(`${apiURL}/profile-pic/id=${id}`, axiosHeader)
  return res.data
}

export { uploadPic, getProfilePic }
