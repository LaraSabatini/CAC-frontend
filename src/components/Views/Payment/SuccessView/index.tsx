import React from "react"
import { useRouter } from "next/router"
import texts from "strings/payment.json"
import { Container, Title, Description, Button } from "./styles"

function SuccessView() {
  const router = useRouter()

  return (
    <Container>
      <Title>{texts.success.title}</Title>
      <div>
        <Description>{texts.success.message}</Description>
        <Description>{texts.success.description}</Description>
      </div>
      <Button type="button" onClick={() => router.push("/login?client=true")}>
        {texts.success.button}
      </Button>
    </Container>
  )
}

export default SuccessView
