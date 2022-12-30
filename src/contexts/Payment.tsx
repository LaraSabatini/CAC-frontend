import { createContext, useState, useMemo } from "react"
import PricingInterface from "interfaces/content/Pricing"
import InputValidation from "@interfaces/components/InputValidation"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import PaymentContextInterface from "interfaces/contexts/PaymentContextInterface"
import {
  defaultPaymet,
  inputErrorsDefault,
} from "const/defaultValuesForContext"

export const PaymentContext = createContext<PaymentContextInterface>({
  payment: defaultPaymet,
  setPayment: () => {},
  pricingList: [],
  setPricingList: () => {},
  inputErrors: inputErrorsDefault,
  setInputErrors: () => {},
})

function PaymentProvider({ children }: any) {
  const [payment, setPayment] = useState<{
    item: ItemInterface
    payer: PayerInterface
  }>(defaultPaymet)

  const [pricingList, setPricingList] = useState<PricingInterface[]>([])

  const [inputErrors, setInputErrors] = useState<InputValidation>(
    inputErrorsDefault,
  )

  const value: any = useMemo(
    () => ({
      payment,
      setPayment,
      pricingList,
      setPricingList,
      inputErrors,
      setInputErrors,
    }),
    [payment, pricingList, inputErrors],
  )

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  )
}

export default PaymentProvider
