import React, { useState } from "react"
import { useRouter } from "next/router"
import InputSelect from "components/UI/InputSelect"
import requestUnblock from "services/support/contactSupport.service"
import Button from "components/UI/Button"
import { Container, Title, ButtonContainer } from "./styles"

function ContactSupportView() {
  const router = useRouter()

  const supportOptions = [{ id: 1, value: "Desbloqueo de cuenta" }]

  const [requestType, setRequestType] = useState<{
    id: number
    value: string
  }>(supportOptions[0])

  const [sentEmail, setSentEmail] = useState<boolean>(false)

  const sendRequest = async () => {
    if (requestType !== undefined && requestType.id === 1) {
      const clientName = router.query.clientName as string

      const requestUnblockCall = await requestUnblock(
        {
          recipients: ["sabatinilara@gmail.com"],
          name: "Administrador",
          clientName: clientName.replace("20%", " "),
          unblockURL: `http://localhost:3000/contactSupport/unblock?id=${router.query.id}`,
        },
        parseInt(router.query.id as string, 10),
      )
      if (requestUnblockCall.data.status === 201) {
        setSentEmail(true)
      }
    }
  }

  return (
    <Container>
      {!sentEmail ? (
        <>
          <Title>Contactar soporte</Title>
          <InputSelect
            label="Solicitud"
            width={440}
            options={supportOptions}
            required
            onClick={(e: { id: number; value: string }) => {
              setRequestType(e)
            }}
          />
          <ButtonContainer>
            <Button content="Enviar solicitud" cta action={sendRequest} />
          </ButtonContainer>
        </>
      ) : (
        <h1>Excelente! el email se envio correctamente</h1>
      )}
    </Container>
  )
}

export default ContactSupportView
