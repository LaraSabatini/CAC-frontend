import React from "react"
import PersonalInfo from "./PersonalInfo"
import PaymentStatus from "./PaymentStatus"
import { Container, FirstRowData } from "./styles"

function ClientProfile() {
  return (
    <Container>
      <FirstRowData>
        <PersonalInfo />
        <PaymentStatus />
      </FirstRowData>
    </Container>
  )
}

export default ClientProfile
