import React, { useEffect } from "react"
import { useRouter } from "next/router"
import userData from "const/userData"
import useUserStatus from "hooks/isLoggedIn"
import checkLastPayment from "helpers/dates/checkLastPayment"
import DashboardView from "components/Views/Dashboard"

function Dashboard() {
  const router = useRouter()

  const isLoggedIn = useUserStatus(userData)

  useEffect(() => {
    if (userData.type === "client") {
      const checkPayment = async () => {
        const checkLastPaymentReq = await checkLastPayment(userData)
        if (checkLastPaymentReq === "expired") {
          router.replace("/profile")
        }
      }

      checkPayment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>{isLoggedIn && <DashboardView />}</div>
}

export default Dashboard
