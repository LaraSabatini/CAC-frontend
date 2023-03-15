import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import texts from "strings/profile.json"
import LoginProvider from "contexts/Login"
import Button from "components/UI/Button"
import PersonalInfo from "./PersonalInfo"
import PaymentStatus from "./PaymentStatus"
import WarningModal from "./WarningModal"
import ChangePasswordModal from "../ChangePasswordModal"
import { Container, FirstRowData, RightColumn, ButtonContainer } from "./styles"

function ClientProfile() {
  const router = useRouter()

  const [deleteProfileWarning, setDeleteProfileWarning] = useState<boolean>(
    false,
  )
  const [changePasswordView, setChangePasswordView] = useState<boolean>(false)

  useEffect(() => {
    if (router.query.change_password === "true") {
      setChangePasswordView(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <Container>
      {deleteProfileWarning && (
        <WarningModal cancel={() => setDeleteProfileWarning(false)} />
      )}
      {changePasswordView && (
        <ChangePasswordModal
          cancel={() => setChangePasswordView(false)}
          cantCancel={router.query.change_password === "true"}
        />
      )}
      <FirstRowData>
        <PersonalInfo />
        <RightColumn>
          <PaymentStatus />
          <ButtonContainer>
            <LoginProvider>
              <Button
                content={texts.changePassword.title}
                cta
                action={() => setChangePasswordView(true)}
              />
            </LoginProvider>
            <Button
              content={texts.deleteProfile.title}
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
