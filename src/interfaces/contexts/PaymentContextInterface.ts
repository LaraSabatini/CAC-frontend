import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import PricingInterface from "interfaces/content/Pricing"
import InputValidation from "@interfaces/components/InputValidation"

interface PaymentContextInterface {
  payment: { item: ItemInterface; payer: PayerInterface }
  setPayment(payment: { item: ItemInterface; payer: PayerInterface }): void
  pricingList: PricingInterface[]
  setPricingList(pricingList: PricingInterface[]): void
  inputErrors: InputValidation
  setInputErrors(inputErrors: InputValidation): void
}
export default PaymentContextInterface
