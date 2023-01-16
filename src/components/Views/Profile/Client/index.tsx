import React, { useState } from "react"
import texts from "strings/profile.json"
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
            <Button
              content={texts.changePassword.title}
              cta
              action={changePassword}
            />
            <Button
              content={texts.deleteProfile}
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
