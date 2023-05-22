import React from "react"
import texts from "strings/errors.json"
import routes from "routes"
import GenericError from "@components/Views/Common/Error/GenericError"
import { useRouter } from "next/router"

function ErrorPage() {
  const router = useRouter()

  return (
    <GenericError
      title={texts.pageNotFound.title}
      description={texts.pageNotFound.description}
      span={texts.pageNotFound.span}
      actionButton={() => router.replace(routes.pricing.name)}
      type="preference"
    />
  )
}

export default ErrorPage
