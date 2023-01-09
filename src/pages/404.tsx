import React from "react"
import texts from "strings/errors.json"
import GenericError from "components/Views/Error/GenericError"
import { useRouter } from "next/router"

function ErrorPage() {
  const router = useRouter()

  return (
    <GenericError
      title={texts.pageNotFound.title}
      description={texts.pageNotFound.description}
      span={texts.pageNotFound.span}
      actionButton={() => router.push("/pricing")}
      type="preference"
    />
  )
}

export default ErrorPage
