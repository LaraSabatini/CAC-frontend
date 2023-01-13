import React from "react"
import Button from "components/UI/Button"
import PersonalInfo from "./PersonalInfo"
import PaymentStatus from "./PaymentStatus"
import { Container, FirstRowData, RightColumn, ButtonContainer } from "./styles"

function ClientProfile() {
  const changePassword = () => {}
  const deleteProfile = () => {}

  return (
    <Container>
      <FirstRowData>
        <PersonalInfo />
        <RightColumn>
          <PaymentStatus />
          <ButtonContainer>
            <Button content="Cambiar contraseña" cta action={changePassword} />
            <Button
              content="Eliminar perfil"
              danger
              cta={false}
              action={deleteProfile}
            />
          </ButtonContainer>
        </RightColumn>
      </FirstRowData>
    </Container>
  )
}

export default ClientProfile
