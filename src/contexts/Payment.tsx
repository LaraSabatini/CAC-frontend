import { createContext, useState, useMemo } from "react"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"

export const PaymentContext = createContext(null)

function PaymentProvider({ children }: any) {
  const [payment, setPayment] = useState<{
    items: ItemInterface[]
    payer: PayerInterface
  } | null>(null)

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
