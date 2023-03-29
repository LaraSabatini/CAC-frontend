import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import createPreference from "services/payment/createPreference.service"
import addMonths from "helpers/dates/addMonths"

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

          if (type === "subscription") {
            const paymentData = {
              preferenceId: getData.id,
              pricePaid: item[0].unit_price,
              itemId: item[0].id,
              paymentExpireDate: addMonths(item[0].time as number),
            }
            // *** Almacenar datos en localStorage para almacenar pago y cliente en la BDD
            localStorage.setItem("payment", JSON.stringify(paymentData))
            localStorage.setItem(
              "item",
              JSON.stringify({ itemName: item[0].title }),
            )
          } else {
            const paymentData = {
              preferenceId: getData.id,
              pricePaid: item[0].unit_price,
              itemId: item[0].id,
              paymentExpireDate: addMonths(item[0].time as number),
            }

            localStorage.setItem("payment", JSON.stringify(paymentData))
          }
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
