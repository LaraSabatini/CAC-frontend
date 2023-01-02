import defaultPost from "services/defaultPost"
import { PaymentInterface } from "interfaces/payments/Payment"
import apiURL from "./route"

const registerPaymentInDB = async (payment: PaymentInterface) => {
  const res = await defaultPost(`${apiURL}/register-in-db`, payment)
  return res
}

export default registerPaymentInDB
