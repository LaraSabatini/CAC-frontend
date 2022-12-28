import React from "react"
import PaymentProvider from "contexts/Payment"
import PricingView from "components/Views/Pricing"

function Pricing() {
  return (
    <PaymentProvider>
      <PricingView />
    </PaymentProvider>
  )
}

export default Pricing
