interface PaymentErrorInterface {
  title: string
  span?: string
  description: string
  actionButton: (arg?: any) => void
  type: "error" | "pending" | "preference"
}

export default PaymentErrorInterface
