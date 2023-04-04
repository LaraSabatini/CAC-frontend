export interface PaymentInterface {
  id: number
  paymentId: string
  status: string
  preferenceId: string
  clientId: number
  mpId: string
  itemId: string
  pricePaid: number
  date: string
  paymentExpireDate: string
}
