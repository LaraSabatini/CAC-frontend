import React from "react"
import texts from "strings/errors.json"
import { useRouter } from "next/router"
import { Container, Title, Description, Button } from "./styles"

function PaymentErrorView() {
  const router = useRouter()

  return (
    <Container>
      <Title>{texts.paymentError.title}</Title>
      <Description>{texts.paymentError.description}</Description>
      <Button type="button" onClick={() => router.push("/pricing")}>
        {texts.paymentError.button}
      </Button>
    </Container>
  )
}

export default PaymentErrorView
