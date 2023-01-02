import React, { useState, useEffect } from "react"
// import paymentTexts from "strings/payment.json"
import { useMercadopago } from "react-sdk-mercadopago"

interface MercadoPagoFormInterface {
  preference: string
}

function MercadoPagoForm({ preference }: MercadoPagoFormInterface) {
  // GENERAR PREFERENCIA CON LOS PRODUCTOS Y LOS DATOS DEL COMPRADOR
  // RECORDATORIO: UNA VEZ CON LAS CREDENCIALES DE PROD NO VA A ESTAR LA MARCA DE AGUA

  const mercadopago = useMercadopago.v2(
    "TEST-ac3e4ad5-9e58-4286-b691-b9b27aba567b",
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
          label: "Pagar",
        },
      })
      setRendered(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mercadopago, rendered])

  return <div className="cho-container" />
}

export default MercadoPagoForm
