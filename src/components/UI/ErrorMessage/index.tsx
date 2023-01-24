import theme from "@theme/index"
import Icon from "components/UI/Assets/Icon"
import Message from "./styles"

export interface ErrorMessageInterface {
  message: string
  has_icon?: boolean
  icon_name?: string
  className?: string
}

function ErrorMessage({
  message,
  has_icon,
  icon_name,
  className,
}: ErrorMessageInterface) {
  return (
    <Message className={className && className}>
      {has_icon && <Icon icon={icon_name as string} color={theme.colors.red} />}
      {message}
    </Message>
  )
}

export default ErrorMessage
