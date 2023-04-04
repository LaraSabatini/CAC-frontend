import React from "react"
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai"
import { BiErrorAlt, BiError } from "react-icons/bi"

import Notification from "./styles"

function PaymentStatus({
  status,
}: {
  status: "success" | "failure" | "pending" | "preferenceError" | string
}) {
  let title = "¡Excelente!"
  let icon = <AiOutlineCheckCircle />
  let description = "Tu pago ha sido procesado con exito."
  let text = (
    <span>
      Recibiras un mail con instrucciones y tus credenciales para iniciar
      sesion.
    </span>
  )

  if (status === "failure") {
    title = "¡UPS!"
    icon = <BiErrorAlt />
    description = "Ocurrio un error al procesar el pago."
    text = (
      <>
        <span>
          Si ves acreditada la compra en tu cuenta de Mercado Pago, por favor
          contactate con soporte para habilitar tu subscripcion.
        </span>
        <span>
          Si no se proceso el pago en tu cuenta, por favor, intentalo mas tarde.
        </span>
      </>
    )
  } else if (status === "preferenceError") {
    title = "Error de proceso"
    icon = <BiError />
    description = "Ocurrio un error en el sistema de Mercado Pago."
    text = (
      <>
        <span>
          Si ves acreditada la compra en tu cuenta de Mercado Pago, por favor
          contactate con soporte para habilitar tu subscripcion.
        </span>
        <span>
          Si no se proceso el pago en tu cuenta, por favor, intentalo mas tarde.
        </span>
      </>
    )
  } else if (status === "pending") {
    title = "Pago pendiente"
    icon = <AiOutlineClockCircle />
    description = "Tu pago esta en proceso."
    text = (
      <>
        <span>
          El estado de tu pago esta en proceso, cuando se acredite recibiras un
          mail con instrucciones y tus credenciales para iniciar sesion.
        </span>
      </>
    )
  }

  return (
    <Notification>
      <h1>
        {icon}
        {title}
      </h1>
      <span className="description">{description}</span>
      {text}
    </Notification>
  )
}

export default PaymentStatus
