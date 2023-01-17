import getPaymentsByClient from "services/payment/getPaymentsByClient.service"
import compareDates from "./compareDates"

const checkLastPayment = async (user: {
  user: string
  type: string
  logged: boolean
  id: number
  paymentExpireDate?: string
}) => {
  const getPaymentsByClientReq = await getPaymentsByClient(user.id)

  if (getPaymentsByClientReq.status === 200) {
    const userData = {
      ...user,
      paymentExpireDate:
        getPaymentsByClientReq.data[getPaymentsByClientReq.data.length - 1]
          .paymentExpireDate,
    }

    sessionStorage.removeItem("userData")
    sessionStorage.setItem("userData", JSON.stringify(userData))

    return compareDates(
      getPaymentsByClientReq.data[getPaymentsByClientReq.data.length - 1]
        .paymentExpireDate,
    )
      ? "current"
      : "expired"
  }
  return "expired"
}

export default checkLastPayment
