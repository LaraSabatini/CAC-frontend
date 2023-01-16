export type ErrorType = "error" | "pending" | "preference"

interface PaymentErrorInterface {
  title: string
  span?: string
  description: string
  actionButton: (arg?: any) => void
  type: ErrorType
}

export default PaymentErrorInterface
