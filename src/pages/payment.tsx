import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import PaymentStatus from "components/Views/Clients/PaymentStatus"

function Payment() {
  const router = useRouter()

  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "failure" | "pending" | "preferenceError" | string
  >("")

  useEffect(() => {
    setPaymentStatus(
      (router.query.payment_status as string) ?? "preferenceError",
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <div>
      <PaymentStatus status={paymentStatus} />
    </div>
  )
}

export default Payment
