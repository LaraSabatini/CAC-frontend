import React, { useState, useContext } from "react"
import { ProfileContext } from "contexts/Profile"
import ClientInterface from "interfaces/users/Client"
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCalendar,
} from "react-icons/ai"
import { TfiLocationPin } from "react-icons/tfi"
import { BiPencil } from "react-icons/bi"
import texts from "strings/profile.json"
import Tooltip from "components/UI/Tooltip"
import EditPersonalInfo from "./EditPersonalInfo"
import DataSet from "./DataSet"
import { Title } from "../styles"
import { PersonalDataCard, Data, CardHeader, EditButton } from "./styles"

function PersonalInfo() {
  const regions: { id: number; value: string }[] = JSON.parse(
    localStorage.getItem("regions") as string,
  )

  const { profileData } = useContext(ProfileContext)

  const data = profileData as ClientInterface

  const [activeEdition, setActiveEdition] = useState<boolean>(false)

  return (
    <PersonalDataCard>
      <CardHeader>
        <Title>{texts.personalData.title}</Title>
        <Tooltip title={texts.personalData.edit}>
          <EditButton type="button" onClick={() => setActiveEdition(true)}>
            <BiPencil />
          </EditButton>
        </Tooltip>
      </CardHeader>
      {!activeEdition ? (
        <Data>
          <DataSet
            icon={<AiOutlineUser />}
            title={[
              `${texts.personalData.fullName}`,
              `${data?.identificationType}`,
            ]}
            value={[
              `${data?.name} ${data?.lastName}`,
              `${data?.identificationNumber}`,
            ]}
          />
          <DataSet
            icon={<AiOutlineMail />}
            title={texts.personalData.email}
            value={data?.email}
          />
          <DataSet
            icon={<AiOutlinePhone />}
            title={[
              `${texts.personalData.phoneAreaCode}`,
              `${texts.personalData.phoneNumber}`,
            ]}
            value={[`${data?.phoneAreaCode}`, `${data?.phoneNumber}`]}
          />
          <DataSet
            icon={<AiOutlineCalendar />}
            title={texts.personalData.creationDate}
            value={data?.dateCreated}
          />
          {regions !== undefined && data !== undefined && (
            <DataSet
              icon={<TfiLocationPin />}
              title="Región:"
              value={
                regions.filter(region => region.id === data?.region)[0]?.value
              }
            />
          )}
        </Data>
      ) : (
        <EditPersonalInfo
          regions={regions}
          cancelChanges={() => setActiveEdition(false)}
        />
      )}
    </PersonalDataCard>
  )
}

export default PersonalInfo
