import React, { useContext, useEffect, useState } from "react"
import { getProfileData } from "services/auth/getProfileData.service"
import { ClientsContext } from "contexts/Clients"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import { Button, Modal, Select, Space } from "antd"
import {
  sendAccountBlockedEmailNotification,
  sendAccountUnblockedEmailNotification,
} from "services/auth/blockedNotificationEmail.service"
import blockAccount from "services/auth/blockAccount.service"
import DataItem from "./DataItem"
import { Card, Title } from "./styles"

function DetailsCard() {
  const {
    clientSelected,
    plans,
    profileData,
    setProfileData,
    setClientSelected,
  } = useContext(ClientsContext)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [serverError, setServerError] = useState<boolean>(false)
  const [required, setRequired] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  const getData = async () => {
    if (clientSelected !== null) {
      const getProfileDataCall = await getProfileData("client", clientSelected)
      if (getProfileDataCall.status === 200) {
        setProfileData(getProfileDataCall.data[0])
      } else {
        setServerError(true)
      }
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSelected])

  const success = () => {
    Modal.success({
      content: "Acción realizada con éxito",
      onOk() {
        setClientSelected(null)
        setOpenModal(false)
      },
    })
  }

  const motives = [
    { id: 1, value: "Incumplimiento de las normas de uso" },
    { id: 2, value: "Otro" },
  ]

  const [motive, setMotive] = useState<string>()

  const blockAction = async () => {
    if (motive === undefined && profileData.accountBlocked === 0) {
      setRequired(true)
    } else if (profileData.accountBlocked === 0 && motive !== undefined) {
      setLoading(true)
      const blockAccountCall = await blockAccount(
        profileData.id as number,
        "block",
      )

      if (blockAccountCall.status === 201) {
        const blockAccountEmail = await sendAccountBlockedEmailNotification(
          {
            recipients: [profileData.email],
            name: profileData.name,
            motive,
          },
          profileData.id as number,
          `${profileData.name}%20${profileData.lastName}`,
        )

        if (blockAccountEmail.status === 201) {
          setLoading(false)
          success()
        }

        setServerError(blockAccountEmail.status !== 201)
      } else {
        setServerError(true)
      }
    } else if (profileData.accountBlocked === 1) {
      setLoading(true)
      const blockAccountCall = await blockAccount(
        profileData.id as number,
        "unblock",
      )

      if (blockAccountCall.status === 201) {
        const unblockAccountEmail = await sendAccountUnblockedEmailNotification(
          {
            recipients: [profileData.email],
            name: profileData.name,
          },
        )

        if (unblockAccountEmail.status === 201) {
          setLoading(false)
          success()
        }
        setServerError(unblockAccountEmail.status !== 201)
      } else {
        setServerError(true)
      }
    }
  }

  return (
    <Card>
      <InternalServerError
        visible={serverError}
        changeVisibility={() => setServerError(false)}
      />
      <Title>Detalles</Title>
      {profileData !== undefined && (
        <div className="personal-data">
          <DataItem
            value="Nombre"
            content={`${profileData.name} ${profileData.lastName}`}
          />
          <DataItem value="Región" content={profileData.region} />
          <DataItem value="Mail" content={profileData.email} />
          <DataItem
            value="Matrícula"
            content={profileData.realEstateRegistration}
          />
          <DataItem
            value="Teléfono"
            content={`${profileData.phoneAreaCode} ${profileData.phoneNumber}`}
          />
          <DataItem
            value="Documento"
            content={profileData.identificationNumber}
          />
          <DataItem
            value="Fecha de nacimiento"
            content={
              profileData.birthdate !== null
                ? profileData.birthdate.replace(/-/g, "/")
                : ""
            }
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
            value="Cantidad de edificios"
            content={
              profileData.amountOfBuildings !== null
                ? profileData.amountOfBuildings
                : ""
            }
          />
          <DataItem
            value="Fecha de inicio de actividad"
            content={
              profileData.activityStartDate !== null
                ? profileData.activityStartDate.replace(/-/g, "/")
                : ""
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
        <Button
          type="primary"
          danger={profileData.accountBlocked !== 1}
          onClick={() => setOpenModal(true)}
        >
          {profileData.accountBlocked === 1 ? "Desbloquear" : "Bloquear"}
        </Button>
      )}

      {profileData !== undefined && (
        <Modal
          title={
            profileData.accountBlocked === 1
              ? `¿Estás seguro de que deseas desbloquear a ${profileData.name} ${profileData.lastName}?`
              : `¿Estás seguro de que deseas bloquear a ${profileData.name} ${profileData.lastName}?`
          }
          open={openModal}
          onOk={blockAction}
          onCancel={() => {
            setOpenModal(false)
          }}
          okText={profileData.accountBlocked === 0 ? "Bloquear" : "Desbloquear"}
          cancelText="Cancelar"
          confirmLoading={loading}
        >
          <p>
            Al bloquearlo/desbloquearlo le llegará un mail al usuario
            notificándolo de esta acción.
          </p>
          {profileData.accountBlocked === 0 ? (
            <Space style={{ paddingTop: "15px" }}>
              <Select
                placeholder="Motivo de bloqueo"
                style={{ width: 300 }}
                onChange={value => {
                  setMotive(value)
                  setRequired(false)
                }}
                options={motives}
                status={required ? "error" : ""}
              />
            </Space>
          ) : (
            <></>
          )}
        </Modal>
      )}
    </Card>
  )
}

export default DetailsCard
