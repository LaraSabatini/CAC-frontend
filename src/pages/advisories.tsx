import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { UserDataType } from "interfaces/users/General"
import checkLastPayment from "helpers/dates/checkLastPayment"
import routes from "routes"
import AdvisoriesProvider from "contexts/Advisories"
import AdvisoriesView from "@components/Views/Common/Advisories"

function Advisories() {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const checkPayment = async (userData: UserDataType) => {
    if (userData.type === "client") {
      const checkLastPaymentReq = await checkLastPayment(userData)
      if (checkLastPaymentReq === "expired") {
        router.replace(
          `${routes.profile.name}?${routes.profile.queries.makePayment}`,
        )
      }
    }
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (userData === null) {
      router.replace(`${routes.login.name}?${routes.login.queries.client}`)
    } else if (userData?.logged) {
      setIsLogged(true)
      if (userData.firstLogin) {
        router.replace(
          `${routes.profile.name}?${routes.profile.queries.changePassword}`,
        )
      } else {
        checkPayment(userData)
      }
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLogged && (
        <AdvisoriesProvider>
          <AdvisoriesView />
        </AdvisoriesProvider>
      )}
    </>
  )
}

export default Advisories
