import React, { useState } from "react"
import { AiOutlineCalendar } from "react-icons/ai"
import PaymentProvider from "contexts/Payment"
import compareDates from "helpers/dates/compareDates"
import texts from "strings/profile.json"
import Button from "components/UI/Button"
import PlanModal from "./PlanModal"
import { Title } from "../styles"
import { Card, State, ExpireDate, CardHeader } from "./styles"

function PaymentStatus() {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const paymentExpired = !compareDates(userData.paymentExpireDate)

  const [showPlans, setShowPlans] = useState<boolean>(false)

  return (
    <PaymentProvider>
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
          <Button
            content="Actualizar pago"
            cta
            action={() => setShowPlans(true)}
          />
        )}
        {showPlans && <PlanModal close={() => setShowPlans(false)} />}
      </Card>
    </PaymentProvider>
  )
}

export default PaymentStatus
