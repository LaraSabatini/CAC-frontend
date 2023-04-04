import axios from "axios"
import axiosHeader from "services/axiosHeader"
import apiURL from "./route"

const updateClientPaymentData = async (
  id: number,
  body: {
    plan: number
    paymentDate: string
    paymentExpireDate: string
  },
) => {
  const res = await axios.put(
    `${apiURL}/client/update_payment_data&id=${id}`,
    body,
    axiosHeader,
  )
  return res.data
}

export default updateClientPaymentData
