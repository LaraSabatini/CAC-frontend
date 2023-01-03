import React, { useState, useEffect } from "react"
import GenericError from "components/Views/Error/GenericError"
import texts from "strings/errors.json"
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
      {paymentStatus === "pending" && (
        <GenericError
          title={texts.paymentPending.title}
          description={texts.paymentPending.description}
          actionButton={() => router.push("/pricing")}
          type="pending"
        />
      )}
      {paymentStatus === "failure" && (
        <GenericError
          title={texts.paymentError.title}
          description={texts.paymentError.description}
          actionButton={() => router.push("/pricing")}
          type="error"
        />
      )}
      {paymentStatus === "preferenceError" && (
        <GenericError
          title={texts.preferenceError.title}
          description={texts.preferenceError.description}
          actionButton={() => router.push("/pricing")}
          type="preference"
          span={texts.preferenceError.span}
        />
      )}
    </div>
  )
}

export default Payment
