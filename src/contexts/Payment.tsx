import { createContext, useState, useMemo } from "react"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import PricingInterface from "interfaces/content/Pricing"
import PaymentContextInterface from "interfaces/contexts/PaymentContextInterface"

export const PaymentContext = createContext<PaymentContextInterface>({
  planSelected: null,
  setPlanSelected: () => {},
  payment: { item: null, payer: null },
  setPayment: () => {},
})

function PaymentProvider({ children }: any) {
  const [payment, setPayment] = useState<{
    item: ItemInterface
    payer: PayerInterface
  } | null>(null)

  const [planSelected, setPlanSelected] = useState<PricingInterface | null>(
    null,
  )

  const value: any = useMemo(
    () => ({
      payment,
      setPayment,
      planSelected,
      setPlanSelected,
    }),
    [payment, planSelected],
  )

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  )
}

export default PaymentProvider
