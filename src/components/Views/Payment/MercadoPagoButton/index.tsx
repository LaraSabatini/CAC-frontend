import React, { useState, useEffect } from "react"
import paymentTexts from "strings/payment.json"
import { useMercadopago } from "react-sdk-mercadopago"

function MercadoPagoForm() {
  // GENERAR PREFERENCIA CON LOS PRODUCTOS Y LOS DATOS DEL COMPRADOR
  // RECORDATORIO: UNA VEZ CON LAS CREDENCIALES DE PROD NO VA A ESTAR LA MARCA DE AGUA

  const mercadopago = useMercadopago.v2(`${process.env.MP_PUBLIC_KEY}`, {
    locale: "es-AR",
  })

  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (mercadopago && !rendered) {
      mercadopago.checkout({
        preference: {
          id: "770826081-6174eaec-958a-495c-9ce5-02279182527c",
        },
        render: {
          container: ".cho-container",
          label: `${paymentTexts.actions.pay}`,
        },
      })
      setRendered(true)
    }
  }, [mercadopago, rendered])

  return <div className="cho-container" />
}

export default MercadoPagoForm
