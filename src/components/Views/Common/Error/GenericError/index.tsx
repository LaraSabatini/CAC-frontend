import React from "react"
import PaymentErrorInterface from "interfaces/components/GenericErrorPage"
import { Button } from "antd"
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
      {type === "preference" && <span className="span">{span}</span>}
      <Description>{description}</Description>
      <Button type="primary" onClick={actionButton}>
        Volver
      </Button>
    </Container>
  )
}

export default GenericError
