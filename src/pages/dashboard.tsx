import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import checkLastPayment from "helpers/dates/checkLastPayment"
import DashboardView from "components/Views/Dashboard"

function Dashboard() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData") as string)

    if (userData !== null) {
      setIsLoggedIn(userData.logged)
      if (userData.type === "client") {
        const checkPayment = async () => {
          const checkLastPaymentReq = await checkLastPayment(userData)
          if (checkLastPaymentReq === "expired") {
            router.replace("/profile")
          }
        }

        checkPayment()
      }
    } else {
      router.replace(`/login?client=true`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>{isLoggedIn && <DashboardView />}</div>
}

export default Dashboard
