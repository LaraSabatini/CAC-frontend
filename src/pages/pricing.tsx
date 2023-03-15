import React, { useEffect } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import PaymentProvider from "contexts/Payment"
import ClientsProvider from "contexts/Clients"
import PricingView from "@components/Views/Clients/Pricing"

function Pricing() {
  const router = useRouter()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)
    if (userData?.logged) {
      router.replace(routes.dashboard.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PaymentProvider>
      <ClientsProvider>
        <PricingView />
      </ClientsProvider>
    </PaymentProvider>
  )
}

export default Pricing
