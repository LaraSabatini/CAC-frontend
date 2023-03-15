import React from "react"
import { useRouter } from "next/router"
import errorTexts from "strings/errors.json"
import ModalStatus from "components/UI/ModalStatus"

interface InternalServerErrorInterface {
  visible: boolean
  changeVisibility: (arg?: any) => void
}

function InternalServerError({
  visible,
  changeVisibility,
}: InternalServerErrorInterface) {
  const router = useRouter()

  return (
    <>
      {visible && (
        <ModalStatus
          title={errorTexts.internalServerError.title}
          description={errorTexts.internalServerError.description}
          status="error"
          selfCloseAction={() => {
            router.reload()
            changeVisibility()
          }}
          selfClose
        />
      )}
    </>
  )
}

export default InternalServerError
