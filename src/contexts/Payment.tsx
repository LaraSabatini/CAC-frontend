import { createContext, useState, useMemo } from "react"
import PricingInterface from "interfaces/content/Pricing"
import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import PaymentContextInterface from "interfaces/contexts/PaymentContextInterface"
import { defaultPaymet } from "const/defaultValuesForPaymentContext"

export const PaymentContext = createContext<PaymentContextInterface>({
  payment: defaultPaymet,
  setPayment: () => {},
  pricingList: [],
  setPricingList: () => {},
  inputErrors: false,
  setInputErrors: () => {},
  frontValidation: () => {},
})

function PaymentProvider({ children }: any) {
  const [payment, setPayment] = useState<{
    item: ItemInterface
    payer: PayerInterface
  }>(defaultPaymet)

  const [pricingList, setPricingList] = useState<PricingInterface[]>([])

  const [inputErrors, setInputErrors] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const frontValidation = () => {
    if (
      payment.payer.name === "" ||
      payment.payer.surname === "" ||
      payment.payer.email === "" ||
      payment.payer.phone.area_code === "" ||
      payment.payer.phone.number === "" ||
      payment.payer.identification.number === ""
    ) {
      setInputErrors(true)
    } else {
      setInputErrors(false)
    }
  }

  const value: any = useMemo(
    () => ({
      payment,
      setPayment,
      pricingList,
      setPricingList,
      inputErrors,
      setInputErrors,
      frontValidation,
    }),
    [payment, pricingList, inputErrors, frontValidation],
  )

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  )
}

export default PaymentProvider
