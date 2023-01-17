import React from "react"
import PaymentProvider from "contexts/Payment"
import ClientsProvider from "contexts/Clients"
import PricingView from "components/Views/Pricing"

function Pricing() {
  return (
    <PaymentProvider>
      <ClientsProvider>
        <PricingView />
      </ClientsProvider>
    </PaymentProvider>
  )
}

export default Pricing
