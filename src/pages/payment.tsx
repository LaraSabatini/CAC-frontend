import React, { useState, useEffect } from "react"
import PaymentErrorView from "components/Views/Error/PaymentError"
import { useRouter } from "next/router"

function Payment() {
  const router = useRouter()

  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "failure" | "peding" | string
  >()

  useEffect(() => {
    setPaymentStatus(router.query.payment_status as string)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <div>
      {paymentStatus === "success" && "success"}
      {paymentStatus === "pending" && "pending"}
      {paymentStatus === "failure" && <PaymentErrorView />}
    </div>
  )
}

export default Payment
