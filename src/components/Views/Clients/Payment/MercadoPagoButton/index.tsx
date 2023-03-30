import React, { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { PaymentContext } from "contexts/Payment"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import createPreference from "services/mercadoPago/createPreference.service" // getPreferenceData,

interface MercadoPagoFormInterface {
  label: string
  item: ItemInterface[]
  payer: PayerInterface
  type: "subscription" | "update"
  redirectPreferenceError: string
}

function MercadoPagoForm({
  item,
  payer,
  type,
  label,
  redirectPreferenceError,
}: MercadoPagoFormInterface) {
  const router = useRouter()

  const { setPreferenceId } = useContext(PaymentContext)

  useEffect(() => {
    const fetchCheckout = async () => {
      const getData = await createPreference(
        {
          item,
          payer,
        },
        type,
      )

      if (getData.id) {
        const script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "https://sdk.mercadopago.com/js/v2"
        script.setAttribute("data-prefetch-id", getData.id)
        document.body.appendChild(script)

        setPreferenceId(getData.id)

        script.onload = () => {
          // @ts-ignore
          const mercadopago = new window.MercadoPago(
            process.env.NEXT_PUBLIC_MP_PUBLIC_KEY_TEST,
            {
              locale: "es-AR",
            },
          )

          mercadopago.checkout({
            preference: {
              id: getData.id,
            },
            render: {
              container: ".cho-container",
              label: `${label}`,
            },
          })

          localStorage.setItem("prefenceId", JSON.stringify(getData.id))
        }
      } else {
        router.replace(redirectPreferenceError)
      }
    }
    fetchCheckout()
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="cho-container" />
}

export default MercadoPagoForm
