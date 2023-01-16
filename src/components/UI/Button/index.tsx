import React from "react"
import ButtonStyled from "./styles"

interface ButtonInterface {
  content: string
  cta: boolean
  danger?: boolean
  action: (arg?: any) => void
}

function Button({ content, cta, action, danger }: ButtonInterface) {
  return (
    <ButtonStyled cta={cta} onClick={action} danger={danger}>
      {content}
    </ButtonStyled>
  )
}

export default Button
