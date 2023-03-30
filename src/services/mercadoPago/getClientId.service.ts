import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const getClientId = async (preferenceId: string) => {
  const res: any = await axios.get(
    `${apiURL}/getClient/preferenceId=${preferenceId}`,
    axiosHeader,
  )
  return res.data
}

export default getClientId
