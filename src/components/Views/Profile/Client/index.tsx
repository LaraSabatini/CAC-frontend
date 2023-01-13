import React, { useState } from "react"
import Button from "components/UI/Button"
import PersonalInfo from "./PersonalInfo"
import PaymentStatus from "./PaymentStatus"
import WarningModal from "./WarningModal"
import { Container, FirstRowData, RightColumn, ButtonContainer } from "./styles"

function ClientProfile() {
  const [deleteProfileWarning, setDeleteProfileWarning] = useState<boolean>(
    false,
  )

  const changePassword = () => {}

  return (
    <Container>
      {deleteProfileWarning && (
        <WarningModal cancel={() => setDeleteProfileWarning(false)} />
      )}
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
              action={() => setDeleteProfileWarning(true)}
            />
          </ButtonContainer>
        </RightColumn>
      </FirstRowData>
    </Container>
  )
}

export default ClientProfile
