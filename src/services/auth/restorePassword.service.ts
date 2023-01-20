import defaultPost from "services/defaultPost"
import { UserType } from "interfaces/users/General"
import apiURL from "./route"

const restorePassword = async (
  type: UserType,
  body: {
    recipients: string[]
    name: string
    restorePasswordURL: string
  },
) => {
  const res = await defaultPost(`${apiURL}/${type}/restore_password`, body)
  return res
}

export default restorePassword
