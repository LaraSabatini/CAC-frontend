import React, { useState, useEffect } from "react"
import paymentTexts from "strings/payment.json"
import { useMercadopago } from "react-sdk-mercadopago"

interface MercadoPagoFormInterface {
  preference: string
}

function MercadoPagoForm({ preference }: MercadoPagoFormInterface) {
  const mercadopago = useMercadopago.v2(
    `${process.env.NEXT_PUBLIC_MP_PUBLIC_KEY_TEST}`,
    {
      locale: "es-AR",
    },
  )

  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (mercadopago && !rendered) {
      mercadopago.checkout({
        preference: {
          id: preference,
        },
        render: {
          container: ".cho-container",
          label: `${paymentTexts.actions.pay}`,
        },
      })
      setRendered(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mercadopago, rendered])

  return <div className="cho-container" />
}

export default MercadoPagoForm
