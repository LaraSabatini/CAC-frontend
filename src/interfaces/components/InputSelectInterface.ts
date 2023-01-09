interface InputSelectInterface {
  label: string
  options: { id: number; value: string }[]
  width?: number
  required?: boolean
  onClick?: (value: { id: number; value: string }) => void
  error?: boolean
  errorMessage?: string
}

export default InputSelectInterface
