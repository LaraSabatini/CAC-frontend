import IconInterface from "interfaces/components/IconInterface"
import Alert from "./Icons/Alert"
import CheckModal from "./Icons/CheckModal"
import Close from "./Icons/Close"
import Error from "./Icons/Error"
import IconNotFound from "./Icons/IconNotFound"
import MenuOff from "./Icons/MenuOff"
import Notice from "./Icons/Notice"
import PasswordHidden from "./Icons/PasswordHidden"
import PasswordVisible from "./Icons/PasswordVisible"
import Profile from "./Icons/Profile"
import Search from "./Icons/Search"
import SingleArrow from "./Icons/SingleArrow"

interface IconComponentInterface extends IconInterface {
  icon: string
}

const Icon = ({ icon, width, height, color }: IconComponentInterface) => {
  function iconSwitch(param: string): JSX.Element {
    switch (param) {
      case "Alert":
        return <Alert width={width} height={height} color={color} />
      case "CheckModal":
        return <CheckModal width={width} height={height} color={color} />
      case "Close":
        return <Close width={width} height={height} color={color} />
      case "Error":
        return <Error width={width} height={height} color={color} />
      case "MenuOff":
        return <MenuOff width={width} height={height} color={color} />
      case "Notice":
        return <Notice width={width} height={height} color={color} />
      case "PasswordHidden":
        return <PasswordHidden width={width} height={height} color={color} />
      case "PasswordVisible":
        return <PasswordVisible width={width} height={height} color={color} />
      case "Profile":
        return <Profile width={width} height={height} color={color} />
      case "Search":
        return <Search width={width} height={height} color={color} />
      case "SingleArrow":
        return <SingleArrow width={width} height={height} color={color} />
      default:
        return <IconNotFound width={width} height={height} color={color} />
    }
  }

  return iconSwitch(icon)
}

export default Icon
