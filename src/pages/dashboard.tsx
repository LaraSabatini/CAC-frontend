import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { UserDataType } from "interfaces/users/General"
import checkLastPayment from "helpers/dates/checkLastPayment"
import DashboardView from "components/Views/Dashboard"

function Dashboard() {
  const router = useRouter()

  const checkPayment = async (userData: UserDataType) => {
    const checkLastPaymentReq = await checkLastPayment(userData)
    if (checkLastPaymentReq === "expired") {
      router.replace("/profile?make_payment=true")
    }
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (userData === null) {
      router.replace("/login?client=true")
    } else if (userData?.logged) {
      if (userData.firstLogin) {
        router.replace("/profile?change_password=true")
      } else {
        checkPayment(userData)
      }
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <DashboardView />
    </div>
  )
}

export default Dashboard
