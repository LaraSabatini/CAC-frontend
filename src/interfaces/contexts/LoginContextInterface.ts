import { LoginInterface } from "interfaces/users/General"

interface ClientsContextInterface {
  userIsClient: boolean
  setUserIsClient: (userIsClient: boolean) => void
  openLoginForm: boolean
  setOpenLoginForm: (openLoginForm: boolean) => void
  loginError: boolean
  setLoginError: (loginError: boolean) => void
  requiredError: boolean
  setRequiredError: (requiredError: boolean) => void
  loginAttempts: number
  setLoginAttempts: (loginAttempts: number) => void
  accountBlocked: boolean
  setAccountBlocked: (accountBlocked: boolean) => void
  revalidate: number
  setRevalidate: (revalidate: number) => void
  formData: LoginInterface
  setFormData: (formData: LoginInterface) => void
  userQuery: string
}
export default ClientsContextInterface
