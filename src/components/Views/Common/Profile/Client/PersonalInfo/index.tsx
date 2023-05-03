import React, { useState, useContext } from "react"
import { ProfileContext } from "contexts/Profile"
import ClientInterface from "interfaces/users/Client"
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import { CalendarOutlined, BuildOutlined } from "@ant-design/icons"
import regions from "const/regions"
import { HiIdentification } from "react-icons/hi"
import { TfiLocationPin } from "react-icons/tfi"
import { BiPencil } from "react-icons/bi"
import texts from "strings/profile.json"
import { Tooltip } from "antd"
import EditPersonalInfo from "./EditPersonalInfo"
import DataSet from "./DataSet"
import { Title } from "../styles"
import { PersonalDataCard, Data, CardHeader, EditButton } from "./styles"

function PersonalInfo() {
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
            icon={<CalendarOutlined />}
            title="Fecha de nacimiento:"
            value={data?.birthdate?.replaceAll("-", "/")}
          />
          <DataSet
            icon={<AiOutlinePhone />}
            title={[
              `${texts.personalData.phoneAreaCode}`,
              `${texts.personalData.phoneNumber}`,
            ]}
            value={[`${data?.phoneAreaCode}`, `${data?.phoneNumber}`]}
          />

          {regions !== undefined && data !== undefined && (
            <DataSet
              icon={<TfiLocationPin />}
              title="Región:"
              value={data.region}
            />
          )}
          <DataSet
            icon={<HiIdentification />}
            title="Matrícula:"
            value={data?.realEstateRegistration}
          />
          <DataSet
            icon={<CalendarOutlined />}
            title="Fecha de inicio de actividad:"
            value={data?.activityStartDate?.replaceAll("-", "/")}
          />
          <DataSet
            icon={<BuildOutlined />}
            title="Cantidad de edificios:"
            value={data?.amountOfBuildings}
          />
          <DataSet
            icon={<CalendarOutlined />}
            title={texts.personalData.creationDate}
            value={data?.dateCreated?.replaceAll("-", "/")}
          />
        </Data>
      ) : (
        <EditPersonalInfo cancelChanges={() => setActiveEdition(false)} />
      )}
    </PersonalDataCard>
  )
}

export default PersonalInfo
