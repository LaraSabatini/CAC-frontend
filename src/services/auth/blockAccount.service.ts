import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const blockAccount = async (id: number) => {
  const res = await axios.put(
    `${apiURL}/client/id=${id}?block_account=true`,
    axiosHeader,
  )
  return res.data
}

export default blockAccount
