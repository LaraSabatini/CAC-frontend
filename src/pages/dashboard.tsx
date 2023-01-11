import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import getPaymentsByClient from "services/payment/getPaymentsByClient.service"
import DashboardView from "components/Views/Dashboard"

function Dashboard() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)

  const checkLastPayment = async (user: {
    user: string
    type: string
    logged: boolean
    id: number
    paymentExpireDate?: string
  }) => {
    const payment = await getPaymentsByClient(user.id)

    const newUserData = {
      ...user,
      paymentExpireDate:
        payment.data[payment.data.length - 1].paymentExpireDate,
    }

    sessionStorage.removeItem("userData")
    sessionStorage.setItem("userData", JSON.stringify(newUserData))
  }

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData") as string)

    if (userData !== null) {
      setIsLoggedIn(userData.logged)
      if (userData.type === "client") {
        checkLastPayment(userData)
      }
    } else {
      router.replace(`/login?client=true`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>{isLoggedIn && <DashboardView />}</div>
}

export default Dashboard
