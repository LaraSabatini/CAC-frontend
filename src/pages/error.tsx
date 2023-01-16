import React from "react"
import { useRouter } from "next/router"
import { ErrorType } from "interfaces/components/GenericErrorPage"
import GenericError from "components/Views/Error/GenericError"

function Error() {
  const router = useRouter()

  return (
    <GenericError
      title={(router.query.title as string) ?? ""}
      description={(router.query.description as string) ?? ""}
      span={(router.query.span as string) ?? ""}
      actionButton={() => {
        if ((router.query.type as ErrorType) === "error") {
          router.push("/pricing")
        } else {
          router.push("/login?client=true")
        }
      }}
      type={(router.query.type as ErrorType) ?? ""}
    />
  )
}

export default Error
