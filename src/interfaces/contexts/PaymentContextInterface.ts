import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import PricingInterface from "interfaces/content/Pricing"

interface PaymentContextInterface {
  payment: { item: ItemInterface; payer: PayerInterface }
  setPayment(payment: { item: ItemInterface; payer: PayerInterface }): void
  pricingList: PricingInterface[]
  setPricingList(pricingList: PricingInterface[]): void
  frontValidation: () => boolean
}
export default PaymentContextInterface
