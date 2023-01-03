import React, { useState, useEffect } from "react"
import paymentTexts from "strings/payment.json"
import { useMercadopago } from "react-sdk-mercadopago"

interface MercadoPagoFormInterface {
  preference: string
}

function MercadoPagoForm({ preference }: MercadoPagoFormInterface) {
  const mercadopago = useMercadopago.v2(
    // "TEST-ac3e4ad5-9e58-4286-b691-b9b27aba567b",
    "TEST-c16abe0b-30df-476b-8215-2c66eeb66da2",
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
