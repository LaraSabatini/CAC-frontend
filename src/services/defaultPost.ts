import axios from "axios"
import axiosHeader from "services/axiosHeader"

const defaultPost = async (apiURL: string, body: any) => {
  const data = await axios
    .post(`${apiURL}`, body, axiosHeader)
    .then(response => {
      const res = response.data
      return res
    })
    .catch(err => {
      const res = err.response
      return res
    })
  return data
}

export default defaultPost
