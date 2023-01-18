import { UserDataType } from "interfaces/users/General"

interface AppContextInterface {
  userData: UserDataType
  setUserData(userData: UserDataType): void
}
export default AppContextInterface
