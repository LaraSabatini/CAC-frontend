import { createContext, useState, useMemo } from "react"
import PricingInterface from "interfaces/content/Pricing"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import PaymentContextInterface from "interfaces/contexts/PaymentContextInterface"
import defaultPaymet from "const/defaultValuesForPaymentContext"

export const PaymentContext = createContext<PaymentContextInterface>({
  payment: defaultPaymet,
  setPayment: () => {},
  pricingList: [],
  setPricingList: () => {},
  preferenceId: "",
  setPreferenceId: () => {},
})

function PaymentProvider({ children }: any) {
  const [payment, setPayment] = useState<{
    item: ItemInterface
    payer: PayerInterface
  }>(defaultPaymet)

  const [pricingList, setPricingList] = useState<PricingInterface[]>([])

  const [preferenceId, setPreferenceId] = useState<string>("")

  const value: any = useMemo(
    () => ({
      payment,
      setPayment,
      pricingList,
      setPricingList,
      preferenceId,
      setPreferenceId,
    }),
    [payment, pricingList, preferenceId],
  )

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  )
}

export default PaymentProvider
