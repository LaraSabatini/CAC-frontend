import Close from "./Icons/Close"
import PasswordHidden from "./Icons/PasswordHidden"
import PasswordVisible from "./Icons/PasswordVisible"
import SingleArrow from "./Icons/SingleArrow"
import IconNotFound from "./Icons/IconNotFound"

interface IconInterface {
  icon: string
}

const Icon = ({ icon }: IconInterface) => {
  function iconSwitch(param: string): JSX.Element {
    switch (param) {
      case "Close":
        return <Close />
      case "PasswordHidden":
        return <PasswordHidden />
      case "PasswordVisible":
        return <PasswordVisible />
      case "SingleArrow":
        return <SingleArrow />
      default:
        return <IconNotFound />
    }
  }

  return iconSwitch(icon)
}

export default Icon
