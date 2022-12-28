import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"
import PricingInterface from "interfaces/content/Pricing"

interface PaymentContextInterface {
  planSelected: PricingInterface | null
  setPlanSelected(planSelected: PricingInterface): void
  payment: { item: ItemInterface | null; payer: PayerInterface | null }
  setPayment(payment: { item: ItemInterface; payer: PayerInterface }): void
}
export default PaymentContextInterface
