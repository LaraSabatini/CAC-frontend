import { createContext, useState, useMemo } from "react"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import PaymentContextInterface from "interfaces/contexts/PaymentContextInterface"
import defaultPaymet from "const/defaultPayment"

export const PaymentContext = createContext<PaymentContextInterface>({
  payment: defaultPaymet,
  setPayment: () => {},
})

function PaymentProvider({ children }: any) {
  const [payment, setPayment] = useState<{
    item: ItemInterface
    payer: PayerInterface
  }>(defaultPaymet)

  const value: any = useMemo(
    () => ({
      payment,
      setPayment,
    }),
    [payment],
  )

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  )
}

export default PaymentProvider
