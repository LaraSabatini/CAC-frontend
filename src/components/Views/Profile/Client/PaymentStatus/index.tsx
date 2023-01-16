import React, { useState, useEffect } from "react"
import { AiOutlineCalendar } from "react-icons/ai"
import compareDates from "helpers/dates/compareDates"
import texts from "strings/profile.json"
import MercadoPagoForm from "components/Views/Payment/MercadoPagoButton"
import { Title } from "../styles"
import { Card, State, ExpireDate, CardHeader } from "./styles"

function PaymentStatus() {
  const userData = JSON.parse(sessionStorage.getItem("userData") as string)

  const [paymentExpired, setPaymentExpired] = useState<boolean>(false)

  useEffect(() => {
    setPaymentExpired(!compareDates(userData.paymentExpireDate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
