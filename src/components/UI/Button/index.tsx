import React from "react"
import ButtonStyled from "./styles"

interface ButtonInterface {
  content: string
  cta: boolean
  danger?: boolean
  action: (arg?: any) => void
  disabled?: boolean
}

function Button({ content, cta, action, danger, disabled }: ButtonInterface) {
  return (
    <ButtonStyled
      disabled={disabled}
      cta={cta}
      onClick={action}
      danger={danger}
    >
      {content}
    </ButtonStyled>
  )
}

export default Button
