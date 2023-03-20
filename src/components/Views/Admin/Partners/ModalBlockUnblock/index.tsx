import React, { useContext, useState } from "react"
import Modal from "components/UI/Modal"
import InputSelect from "components/UI/InputSelect"
import { ClientsContext } from "contexts/Clients"
import Button from "components/UI/Button"
import ModalStatus from "components/UI/ModalStatus"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import {
  sendAccountBlockedEmailNotification,
  sendAccountUnblockedEmailNotification,
} from "services/auth/blockedNotificationEmail.service"
import blockAccount from "services/auth/blockAccount.service"
import { ModalContainer, Title, ButtonContainer } from "./styles"

interface ModalBlockUnblockInterface {
  action: "block" | "unblock"
  cancel: (arg?: any) => void
}

function ModalBlockUnblock({ action, cancel }: ModalBlockUnblockInterface) {
  const { profileData, setClientSelected } = useContext(ClientsContext)

  const motives = [{ id: 1, value: "Incumplimiento de las normas de uso" }]

  const [motive, setMotive] = useState<{ id: number; value: string }>(
    motives[0],
  )
  const [actionSuccess, setActionSuccess] = useState<boolean>(false)
  const [serverError, setServerError] = useState<boolean>(false)

  const sendBlockAccount = async () => {
    let success = false

    if (motive !== undefined) {
      const blockAccountCall = await blockAccount(
        profileData.id as number,
        "block",
      )

      success = blockAccountCall.status === 201
      if (blockAccountCall.status === 201) {
        const blockAccountEmail = await sendAccountBlockedEmailNotification(
          {
            recipients: [profileData.email],
            name: profileData.name,
            motive: motive.value,
          },
          profileData.id as number,
          `${profileData.name}%20${profileData.lastName}`,
        )

        success = blockAccountEmail.status === 201
      }

      setActionSuccess(success)
      setServerError(!success)
    }
  }

  const unblockAccount = async () => {
    let success = false

    const blockAccountCall = await blockAccount(
      profileData.id as number,
      "unblock",
    )

    success = blockAccountCall.status === 201

    if (blockAccountCall.status === 201) {
      const unblockAccountEmail = await sendAccountUnblockedEmailNotification({
        recipients: [profileData.email],
        name: profileData.name,
      })

      success = unblockAccountEmail.status === 201
    }

    setActionSuccess(success)
    setServerError(!success)
  }

  return (
    <Modal>
      <>
        {actionSuccess && (
          <ModalStatus
            title="Excelente"
            description={`La cuenta ha sido ${
              action === "block" ? "bloqueada" : "desbloqueada"
            } con exito`}
            status="success"
            selfClose
            selfCloseAction={() => {
              cancel()
              setClientSelected(null)
            }}
          />
        )}
        {serverError && (
          <InternalServerError visible changeVisibility={cancel} />
        )}
        {action === "unblock" ? (
          <ModalContainer>
            <Title>
              Desbloquear usuario:{" "}
              <span>
                {profileData.name} {profileData.lastName}
              </span>
            </Title>
            <p className="description">
              ¿Estas seguro de que deseas desbloquear a este usuario?
            </p>

            <ButtonContainer>
              <Button content="Cancelar" cta={false} action={cancel} />
              <Button content="Confirmar" cta action={unblockAccount} />
            </ButtonContainer>
          </ModalContainer>
        ) : (
          <ModalContainer>
            <Title>
              Bloquear usuario:{" "}
              <span>
                {profileData.name} {profileData.lastName}
              </span>
            </Title>
            <p className="description">
              ¿Estas seguro de que deseas bloquear a este usuario?
              <span>
                Al bloquearlo le llegara un mail al usuario notificandolo de
                esta accion.
              </span>
            </p>
            <InputSelect
              label="Motivo de bloqueo"
              width={410}
              options={motives}
              required
              onClick={(e: { id: number; value: string }) => {
                setMotive(e)
              }}
            />
            <ButtonContainer>
              <Button content="Cancelar" cta={false} action={cancel} />
              <Button content="Confirmar" cta action={sendBlockAccount} />
            </ButtonContainer>
          </ModalContainer>
        )}
      </>
    </Modal>
  )
}

export default ModalBlockUnblock
