import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import ProfileProvider from "contexts/Profile"
import ProfileView from "components/Views/Profile"
import { UserDataType } from "interfaces/users/General"
import checkLastPayment from "helpers/dates/checkLastPayment"

function Profile() {
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
      setIsLogged(userData.logged)
      checkPayment(userData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isLogged && (
        <ProfileProvider>
          <ProfileView />
        </ProfileProvider>
      )}
    </div>
  )
}

export default Profile
