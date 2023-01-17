interface InputInterface {
  label: string
  required: boolean
  width?: number
  height?: number
  type: "text" | "password" | "email" | "number" | "textarea"
  error?: boolean
  errorMessage?: string
  backError?: boolean
  backErrorMessage?: string
  patternMessage?: string
  value?: string
  disabled?: boolean
  max?: number
  min?: number
  alphabetic?: boolean
  alphanumeric?: boolean
  pattern?: string
  ref?: any
  specialCharacters?: boolean
  onChange?: (arg: any) => void
  onBlur?: (arg?: any) => void
  keyDown?: (arg?: any) => void
  placeholder?: string
}

export default InputInterface
