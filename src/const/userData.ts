import { UserDataType } from "interfaces/users/General"

// eslint-disable-next-line import/no-mutable-exports
let userData!: UserDataType

if (typeof window !== "undefined") {
  userData = JSON.parse(sessionStorage.getItem("userData") as string)
}

export default userData
