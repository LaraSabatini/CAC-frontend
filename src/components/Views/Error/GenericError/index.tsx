import React from "react"
import PaymentErrorInterface from "interfaces/components/GenericErrorPage"
import texts from "strings/errors.json"
import { Container, Title, Description, Button } from "../sharedStyles"

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
      <Button type="button" onClick={actionButton}>
        {texts.paymentError.button}
      </Button>
    </Container>
  )
}

export default GenericError
