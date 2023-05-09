import React, { useState } from "react"
import { useRouter } from "next/router"
import requestUnblock from "services/support/contactSupport.service"
import { Button, Select } from "antd"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import { Container, Title, ButtonContainer } from "./styles"

function ContactSupportView() {
  const router = useRouter()

  const supportOptions = [{ id: 1, value: "Desbloqueo de cuenta" }]
  const [serverError, setServerError] = useState<boolean>(false)

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
          recipients: ["cadaccomision@gmail.com"],
          name: "Administrador",
          clientName: clientName.replace("20%", " "),
          unblockURL: `${process.env.NEXT_PUBLIC_FRONT_URL}/contactSupport/unblock?id=${router.query.id}`,
        },
        parseInt(router.query.id as string, 10),
      )
      if (requestUnblockCall.data.status === 201) {
        setSentEmail(true)
      } else {
        setServerError(true)
      }
    }
  }

  return (
    <Container>
      <InternalServerError
        visible={serverError}
        changeVisibility={() => setServerError(false)}
      />
      {!sentEmail ? (
        <>
          <Title>Contactar soporte</Title>

          <Select
            placeholder="Selecciona una opcion"
            onChange={value => {
              const findId = supportOptions.filter(
                option => option.value === value,
              )
              setRequestType({
                id: findId[0].id,
                value,
              })
            }}
            options={supportOptions}
          />
          <ButtonContainer>
            <Button type="primary" onClick={sendRequest}>
              Enviar solicitud
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <h1>¡Excelente! El email se envió correctamente</h1>
      )}
    </Container>
  )
}

export default ContactSupportView
