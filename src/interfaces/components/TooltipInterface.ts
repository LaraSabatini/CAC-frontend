interface TooltipInterface {
  title: string | number | JSX.Element | JSX.Element[]
  bgcolor?: string
  color?: string
  opacity?: string
  children?: JSX.Element[] | JSX.Element
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "sidebar"
}

export default TooltipInterface
