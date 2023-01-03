import React, { useState, useEffect } from "react"
import PaymentErrorView from "components/Views/Error/PaymentError"
import PreferenceError from "components/Views/Error/PreferenceError"
import { useRouter } from "next/router"

function Payment() {
  const router = useRouter()

  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "failure" | "peding" | "preferenceError" | string
  >()

  useEffect(() => {
    setPaymentStatus(
      (router.query.payment_status as string) ?? "preferenceError",
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <div>
      {paymentStatus === "success" && "success"}
      {paymentStatus === "pending" && "pending"}
      {paymentStatus === "failure" && <PaymentErrorView />}
      {paymentStatus === "preferenceError" && <PreferenceError />}
    </div>
  )
}

export default Payment
