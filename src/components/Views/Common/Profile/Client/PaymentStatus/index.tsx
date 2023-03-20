import React from "react"
import { AiOutlineCalendar } from "react-icons/ai"
import compareDates from "helpers/dates/compareDates"
import texts from "strings/profile.json"
import MercadoPagoForm from "@components/Views/Clients/Payment/MercadoPagoButton"
import { Title } from "../styles"
import { Card, State, ExpireDate, CardHeader } from "./styles"

function PaymentStatus() {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const paymentExpired = !compareDates(userData.paymentExpireDate)

  return (
    <Card>
      <CardHeader>
        <Title>{texts.paymentData.title}</Title>
        <State state={paymentExpired}>
          {paymentExpired
            ? `${texts.paymentData.expired}`
            : `${texts.paymentData.active}`}
        </State>
      </CardHeader>
      <ExpireDate>
        <AiOutlineCalendar />
        <span>{texts.paymentData.expiration}</span>
        <p>{userData.paymentExpireDate}</p>
      </ExpireDate>
      {paymentExpired && (
        <MercadoPagoForm
          label={texts.paymentData.updatePayment}
          preference=""
        />
      )}
    </Card>
  )
}

export default PaymentStatus
