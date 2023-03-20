import React, { useState } from "react"
import blockAccount from "services/auth/blockAccount.service"
import { sendAccountUnblockedEmailNotification } from "services/auth/blockedNotificationEmail.service"
import { getProfileData } from "services/auth/getProfileData.service"
import Button from "components/UI/Button"
import { useRouter } from "next/router"
import PageContainer from "./styles"

function Unblock() {
  const router = useRouter()

  const [success, setSuccess] = useState<boolean>(false)

  const unblockUser = async () => {
    const unblockAccountCall = await blockAccount(
      parseInt(router.query.id as string, 10),
      "unblock",
    )

    const profileData = await getProfileData(
      "client",
      parseInt(router.query.id as string, 10),
    )

    if (unblockAccountCall.status === 201) {
      const sendNotification = await sendAccountUnblockedEmailNotification({
        recipients: [profileData.data[0].email],
        name: profileData.data[0].name,
      })

      setSuccess(sendNotification.status === 201)
    }
  }

  return (
    <PageContainer>
      {!success ? (
        <>
          <h1>Solicitud de desbloqueo:</h1>
          <Button content="Desbloquear usuario" cta action={unblockUser} />
        </>
      ) : (
        <h1>
          Excelente!
          <span>El usuario ha sido desbloqueado con exito.</span>
        </h1>
      )}
    </PageContainer>
  )
}

export default Unblock
