import React from "react"
import Button from "components/UI/Button"
import PersonalInfo from "./PersonalInfo"
import PaymentStatus from "./PaymentStatus"
import { Container, FirstRowData } from "./styles"

function ClientProfile() {
  const changePassword = () => {}
  const deleteProfile = () => {}

  return (
    <Container>
      <FirstRowData>
        <PersonalInfo />
        <div className="subdiv">
          <PaymentStatus />
          <div className="buttons">
            <Button content="Cambiar contraseña" cta action={changePassword} />
            <Button
              content="Eliminar perfil"
              danger
              cta={false}
              action={deleteProfile}
            />
          </div>
        </div>
      </FirstRowData>
    </Container>
  )
}

export default ClientProfile
