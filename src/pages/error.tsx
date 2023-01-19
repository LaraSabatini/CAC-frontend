import React from "react"
import { useRouter } from "next/router"
import routes from "routes"
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
          router.replace(routes.pricing.name)
        } else {
          router.replace(`${routes.login}?${routes.login.queries.client}`)
        }
      }}
      type={(router.query.type as ErrorType) ?? ""}
    />
  )
}

export default Error
