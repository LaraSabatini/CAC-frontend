import defaultPost from "services/defaultPost"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"

const apiURL = "http://localhost:3000"

const createPreference = async (body: {
  items: ItemInterface[]
  payer: PayerInterface
}) => {
  const res = await defaultPost(`${apiURL}/payment/create-preference`, body)
  return res
}

export default createPreference
