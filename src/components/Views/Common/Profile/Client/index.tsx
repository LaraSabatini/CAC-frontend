import React from "react"
import { useRouter } from "next/router"
import LoginProvider from "contexts/Login"
import PersonalInfo from "./PersonalInfo"
import PaymentStatus from "./PaymentStatus"
import WarningModal from "./WarningModal"
import ChangePasswordModal from "../ChangePasswordModal"

import { Container, FirstRowData, RightColumn, ButtonContainer } from "./styles"

function ClientProfile() {
  const router = useRouter()

  return (
    <Container>
      <FirstRowData>
        <PersonalInfo />
        <RightColumn>
          <PaymentStatus />
          <ButtonContainer>
            <LoginProvider>
              <ChangePasswordModal
                cantCancel={router.query.change_password === "true"}
              />
            </LoginProvider>
            <WarningModal />
          </ButtonContainer>
        </RightColumn>
      </FirstRowData>
    </Container>
  )
}

export default ClientProfile
