import React, { useState, useEffect } from "react"
import register from "services/auth/register.service"
import registerPaymentInDB from "services/payment/registerPaymentInDB.service"
import GenericError from "components/Views/Error/GenericError"
import SuccessView from "components/Views/Payment/SuccessView"
import texts from "strings/errors.json"
import { dateFormated } from "helpers/dates/getToday"
import generatePassword from "helpers/users/generatePassword"
import { useRouter } from "next/router"

function Payment() {
  const router = useRouter()

  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "failure" | "peding" | "preferenceError" | string
  >()

  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false)

  useEffect(() => {
    setPaymentStatus(
      (router.query.payment_status as string) ?? "preferenceError",
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const registerData = async () => {
    let success: boolean = false
    const client = JSON.parse(sessionStorage.getItem("client") as string)
    const payment = JSON.parse(sessionStorage.getItem("payment") as string)

    const newPassword = generatePassword()

    const registerNewClient = await register("client", {
      ...client,
      password: newPassword,
      accountBlocked: 0,
      subscription: 1,
      dateCreated: dateFormated,
    })

    if (registerNewClient.status === 200) {
      const registerPayment = await registerPaymentInDB({
        ...payment,
        paymentId: router.query.payment_id,
        collectionId: router.query.collection_id,
        collectionStatus: router.query.collection_status,
        status: router.query.status,
        paymentType: router.query.payment_type,
        merchantOrderId: router.query.merchant_order_id,
        clientId: registerNewClient.clientId,
      })

      success =
        registerPayment.status === 200 && registerNewClient.status === 200

      setRegistrationSuccess(success)
    }

    if (success) {
      sessionStorage.removeItem("client")
      sessionStorage.removeItem("payment")
    }
  }

  useEffect(() => {
    if (paymentStatus === "success") {
      registerData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentStatus])

  return (
    <div>
      {paymentStatus === "success" && registrationSuccess && <SuccessView />}
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
