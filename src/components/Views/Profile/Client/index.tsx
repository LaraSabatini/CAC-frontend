import React, { useState } from "react"
import texts from "strings/profile.json"
import Button from "components/UI/Button"
import PersonalInfo from "./PersonalInfo"
import PaymentStatus from "./PaymentStatus"
import WarningModal from "./WarningModal"
import ChangePasswordModal from "./ChangePasswordModal"
import { Container, FirstRowData, RightColumn, ButtonContainer } from "./styles"

function ClientProfile() {
  const [deleteProfileWarning, setDeleteProfileWarning] = useState<boolean>(
    false,
  )
  const [changePasswordView, setChangePasswordView] = useState<boolean>(false)

  return (
    <Container>
      {deleteProfileWarning && (
        <WarningModal cancel={() => setDeleteProfileWarning(false)} />
      )}
      {changePasswordView && (
        <ChangePasswordModal cancel={() => setChangePasswordView(false)} />
      )}
      <FirstRowData>
        <PersonalInfo />
        <RightColumn>
          <PaymentStatus />
          <ButtonContainer>
            <Button
              content={texts.changePassword.title}
              cta
              action={() => setChangePasswordView(true)}
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
