import React, { useContext, useEffect, useState } from "react"
import { getProfileData } from "services/auth/getProfileData.service"
import { ClientsContext } from "contexts/Clients"
import regions from "const/regions"
import DataItem from "./DataItem"
import ModalBlockUnblock from "../ModalBlockUnblock"
import { Card, Title, ActionButton } from "./styles"

function DetailsCard() {
  const { clientSelected, plans, profileData, setProfileData } = useContext(
    ClientsContext,
  )

  const [openModal, setOpenModal] = useState<boolean>(false)

  const getData = async () => {
    if (clientSelected !== null) {
      const getProfileDataCall = await getProfileData("client", clientSelected)
      setProfileData(getProfileDataCall.data[0])
    }
  }

  useEffect(() => {
    getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSelected])

  return (
    <Card>
      <Title>Detalles</Title>
      {profileData !== undefined && (
        <div className="personal-data">
          <DataItem
            value="Nombre"
            content={`${profileData.name} ${profileData.lastName}`}
          />
          <DataItem
            value="Region"
            content={
              regions?.filter(region => profileData.region === region.id)[0]
                ?.value
            }
          />
          <DataItem value="Mail" content={profileData.email} />
          <DataItem
            value="Matricula"
            content={profileData.realEstateRegistration}
          />
          <DataItem
            value="Telefono"
            content={`${profileData.phoneAreaCode} ${profileData.phoneNumber}`}
          />
          <DataItem
            value="Documento"
            content={profileData.identificationNumber}
          />
          <DataItem
            value="Miembro desde"
            content={profileData.dateCreated.replace(/-/g, "/")}
          />
          <DataItem
            value="Plan actual"
            content={
              plans?.filter(plan => profileData.plan === plan.id)[0]?.name
            }
          />
          <DataItem
            value="Fecha de pago"
            content={
              profileData.paymentDate !== null
                ? profileData.paymentDate.replace(/-/g, "/")
                : ""
            }
          />
          <DataItem
            value="Vencimiento de pago"
            content={
              profileData.paymentExpireDate !== null
                ? profileData.paymentExpireDate.replace(/-/g, "/")
                : ""
            }
          />
        </div>
      )}
      {profileData !== undefined && (
        <ActionButton
          action={profileData.accountBlocked === 1 ? "unblock" : "block"}
          onClick={() => setOpenModal(true)}
        >
          {profileData.accountBlocked === 1 ? "Desbloquear" : "Bloquear"}
        </ActionButton>
      )}
      {openModal && (
        <ModalBlockUnblock
          cancel={() => setOpenModal(false)}
          action={profileData?.accountBlocked === 1 ? "unblock" : "block"}
        />
      )}
    </Card>
  )
}

export default DetailsCard
