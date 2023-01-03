import defaultPost from "services/defaultPost"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import apiURL from "./route"

const createPreference = async (body: {
  item: ItemInterface[]
  payer: PayerInterface
}) => {
  const res = await defaultPost(`${apiURL}/create-preference`, body)
  return res
}

export default createPreference
