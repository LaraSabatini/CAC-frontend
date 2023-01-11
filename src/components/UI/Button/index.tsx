import React from "react"
import ButtonStyled from "./styles"

interface ButtonInterface {
  content: string
  cta: boolean
  action: (arg?: any) => void
}

function Button({ content, cta, action }: ButtonInterface) {
  return (
    <ButtonStyled cta={cta} onClick={action}>
      {content}
    </ButtonStyled>
  )
}

export default Button
