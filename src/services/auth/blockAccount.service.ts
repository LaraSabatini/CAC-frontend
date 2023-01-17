import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const blockAccount = async (id: number) => {
  const res = await axios.put(
    `${apiURL}/client/block_account=true&id=${id}`,
    axiosHeader,
  )
  return res.data
}

export default blockAccount
