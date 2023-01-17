import React from "react"
import PaymentErrorInterface from "interfaces/components/GenericErrorPage"
import texts from "strings/errors.json"
import Button from "components/UI/Button"
import { Container, Title, Description } from "../sharedStyles"

function GenericError({
  title,
  span,
  description,
  actionButton,
  type,
}: PaymentErrorInterface) {
  return (
    <Container>
      <Title>{title}</Title>
      {type === "preference" && <span>{span}</span>}
      <Description>{description}</Description>
      <div>
        <Button cta action={actionButton} content={texts.paymentError.button} />
      </div>
    </Container>
  )
}

export default GenericError
