import React from "react"
import texts from "strings/errors.json"
import { useRouter } from "next/router"
import { Container, Title, Description, Button } from "../sharedStyles"

function PreferenceError() {
  const router = useRouter()

  return (
    <Container>
      <Title>UPS!</Title>
      <span>500 - Internal Server Error</span>
      <Description>
        Ocurrio un error en el proceso de la compra, por favor intentalo
        nuevamente mas tarde.
      </Description>
      <Button type="button" onClick={() => router.push("/pricing")}>
        {texts.paymentError.button}
      </Button>
    </Container>
  )
}

export default PreferenceError
