import React from "react"
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCalendar,
} from "react-icons/ai"
import { BiPencil } from "react-icons/bi"
import texts from "strings/profile.json"
import ClientInterface from "interfaces/users/Client"
import Tooltip from "components/UI/Tooltip"
import { Title } from "../styles"
import {
  PersonalDataCard,
  DataSet,
  RowContent,
  Data,
  CardHeader,
  EditButton,
} from "./styles"

interface ProfileDataInterface {
  profile: ClientInterface
}

function PersonalInfo({ profile }: ProfileDataInterface) {
  return (
    <PersonalDataCard>
      <CardHeader>
        <Title>{texts.personalData.title}</Title>
        <Tooltip title={texts.personalData.edit}>
          <EditButton>
            <BiPencil />
          </EditButton>
        </Tooltip>
      </CardHeader>
      <Data>
        <DataSet>
          <AiOutlineUser />
          <RowContent>
            <p>
              <span>{texts.personalData.fullName}</span>
              {profile?.name} {profile?.lastName}
            </p>
            <p>
              <span>{profile?.identificationType}:</span>
              {profile?.identificationNumber}
            </p>
          </RowContent>
        </DataSet>
        <DataSet>
          <AiOutlineMail />
          <p>
            <span>{texts.personalData.email}</span>
            {profile?.email}
          </p>
        </DataSet>
        <DataSet>
          <AiOutlinePhone />
          <RowContent>
            <p>
              <span>{texts.personalData.phoneAreaCode}</span>
              {profile?.phoneAreaCode}
            </p>
            <p>
              <span>{texts.personalData.phoneNumber}</span>
              {profile?.phoneNumber}
            </p>
          </RowContent>
        </DataSet>
        <DataSet>
          <AiOutlineCalendar />
          <p>
            <span>{texts.personalData.creationDate}</span>
            {profile?.dateCreated}
          </p>
        </DataSet>
      </Data>
    </PersonalDataCard>
  )
}

export default PersonalInfo
