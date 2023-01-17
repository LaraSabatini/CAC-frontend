import React from "react"
import TooltipInterface from "interfaces/components/TooltipInterface"
import { TooltipContainer, TooltipItem } from "./styles"

function Tooltip({
  title,
  children,
  placement,
  bgcolor,
  color,
  opacity,
}: TooltipInterface) {
  return title ? (
    <TooltipContainer>
      <TooltipItem
        placement={placement}
        bgcolor={bgcolor}
        color={color}
        opacity={opacity}
        className="tooltip-item"
      >
        {title}
      </TooltipItem>
      <div>{children}</div>
    </TooltipContainer>
  ) : (
    <div>{children}</div>
  )
}

export default Tooltip
