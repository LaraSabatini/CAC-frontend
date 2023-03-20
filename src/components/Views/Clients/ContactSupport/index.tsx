import React, { useState } from "react"
import { useRouter } from "next/router"
import InputSelect from "components/UI/InputSelect"
import requestUnblock from "services/support/contactSupport.service"
import Button from "components/UI/Button"
import { Container, Title, ButtonContainer } from "./styles"

function ContactSupportView() {
  const router = useRouter()

  const [requestType, setRequestType] = useState<{
    id: number
    value: string
  }>()

  const sendRequest = async () => {
    if (requestType !== undefined && requestType.id === 1) {
      const requestUnblockCall = await requestUnblock(
        {
          recipients: ["sabatinilara@gmail.com"],
          name: "Administrador",
          clientName: router.query.clientName as string,
          unblockURL: `http://localhost:3000/contactSupport/unblock?id=${router.query.id}`,
        },
        parseInt(router.query.id as string, 10),
      )
      // eslint-disable-next-line no-console
      console.log("requestUnblockCall", requestUnblockCall)
    }
  }

  return (
    <Container>
      <Title>Contactar soporte</Title>
      <InputSelect
        label="Solicitud"
        width={440}
        options={[{ id: 1, value: "Desbloqueo de cuenta" }]}
        required
        onClick={(e: { id: number; value: string }) => {
          setRequestType(e)
        }}
      />
      <ButtonContainer>
        <Button content="Enviar solicitud" cta action={sendRequest} />
      </ButtonContainer>
    </Container>
  )
}

export default ContactSupportView
