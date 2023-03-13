import React from "react"
import theme from "@theme/index"
import Icon from "components/UI/Assets/Icon"
import { ChipContainer, Close } from "./styles"

interface ComboChipInterface {
  value: string | JSX.Element
  onClick?: (arg?: any) => void
}

function ComboChip({ value, onClick }: ComboChipInterface) {
  return (
    <ChipContainer>
      <p className="chip-display-name">{value}</p>
      {onClick && (
        <Close type="button" onClick={onClick}>
          <Icon icon="MenuOff" color={theme.colors.blue} />
        </Close>
      )}
    </ChipContainer>
  )
}

export default ComboChip
