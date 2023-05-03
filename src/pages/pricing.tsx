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
      <div
        style={{
          backgroundImage: `url(https://camarafederal.com.ar/software/imgs/Pantalla%20login-04.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <ClientsProvider>
          <PricingView />
        </ClientsProvider>
      </div>
    </PaymentProvider>
  )
}

export default Pricing
