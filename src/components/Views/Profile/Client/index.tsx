import React from "react"
import ClientInterface from "interfaces/users/Client"
import PersonalInfo from "./PersonalInfo"
import PaymentStatus from "./PaymentStatus"
// import PaymentHistory from "./PaymentHistory"
import {
  Container,
  FirstRowData,
  //  VerticalContainer
} from "./styles"

interface ProfileDataInterface {
  profile: ClientInterface
}

function ClientProfile({ profile }: ProfileDataInterface) {
  return (
    <Container>
      <FirstRowData>
        {/* <VerticalContainer> */}
        <PersonalInfo profile={profile} />
        {/* <PaymentHistory /> */}
        {/* </VerticalContainer> */}
        <PaymentStatus />
      </FirstRowData>
    </Container>
  )
}

export default ClientProfile
