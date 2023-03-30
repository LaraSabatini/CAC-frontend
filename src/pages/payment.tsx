import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

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

  // SI VUELVE A LA PAGINA => osea que router tiene cosas
  // notificacion de que le llegara un mail con los siguientes pasos una vez que se procese el pago

  /*
  Si payment status === OK
    notificacion de que le llegara un mail con las credenciales
  Sino
    notificacion de que hubo un error en el pago, si se acredito el pago en su cuenta, que
    contacte a soporte
*/

  return (
    <div>
      {paymentStatus === "success" && <h1>success</h1>}
      {paymentStatus === "failure" && <h1>failure</h1>}
      {paymentStatus === "pending" && <h1>pending</h1>}
      {paymentStatus === "preference error" && <h1>preference error</h1>}
    </div>
  )
}

export default Payment
