import React, {
  useEffect,
  // , useState
} from "react"
// import { PaymentInterface } from "interfaces/payments/Payment"
import getPaymentsByClient from "services/payment/getPaymentsByClient.service"
import { Title } from "../styles"
import { Card } from "./styles"

function PaymentHistory() {
  const userData = JSON.parse(sessionStorage.getItem("userData") as string)

  // const [paymentsList, setPaymentsList] = useState<PaymentInterface[]>([])

  const getPaymentData = async () => {
    const req = await getPaymentsByClient(userData.id)
    // setPaymentsList(req.data)
    // eslint-disable-next-line no-console
    console.log(req)
  }

  useEffect(() => {
    getPaymentData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <Title>Historial de pagos:</Title>
    </Card>
  )
}

export default PaymentHistory
