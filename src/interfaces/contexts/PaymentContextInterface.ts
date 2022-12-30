import { ItemInterface, PayerInterface } from "interfaces/payments/Preference"

interface PaymentContextInterface {
  payment: { item: ItemInterface; payer: PayerInterface }
  setPayment(payment: { item: ItemInterface; payer: PayerInterface }): void
}
export default PaymentContextInterface
