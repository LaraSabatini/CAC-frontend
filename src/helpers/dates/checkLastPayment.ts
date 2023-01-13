import getPaymentsByClient from "services/payment/getPaymentsByClient.service"
import compareDates from "./compareDates"

const checkLastPayment = async (user: {
  user: string
  type: string
  logged: boolean
  id: number
  paymentExpireDate?: string
}) => {
  const payment = await getPaymentsByClient(user.id)

  const userData = {
    ...user,
    paymentExpireDate: payment.data[payment.data.length - 1].paymentExpireDate,
  }

  sessionStorage.removeItem("userData")
  sessionStorage.setItem("userData", JSON.stringify(userData))

  return compareDates(payment.data[payment.data.length - 1].paymentExpireDate)
    ? "current"
    : "expired"
}

export default checkLastPayment
