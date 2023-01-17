interface ModalStatusInterface {
  title: string
  description: string
  status: "error" | "success" | "warning" | "notice"
  ctaButton?: {
    content: string
    action: (arg?: any) => void
  }
  secondaryButton?: {
    content: string
    action: (arg?: any) => void
  }
  selfClose?: boolean
  selfCloseAction?: (arg?: any) => void
}

export default ModalStatusInterface
