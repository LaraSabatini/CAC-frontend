import { createContext, useState, useMemo } from "react"
import LoginContextInterface from "interfaces/contexts/LoginContextInterface"
import { LoginInterface } from "interfaces/users/General"

export const LoginContext = createContext<LoginContextInterface>({
  userIsClient: true,
  setUserIsClient: () => {},
  openLoginForm: true,
  setOpenLoginForm: () => {},
  loginError: false,
  setLoginError: () => {},
  requiredError: false,
  setRequiredError: () => {},
  loginAttempts: 0,
  setLoginAttempts: () => {},
  accountBlocked: false,
  setAccountBlocked: () => {},
  revalidate: 0,
  setRevalidate: () => {},
  formData: {
    email: "",
    password: "",
  },
  setFormData: () => {},
  userQuery: "user=client",
})

function LoginProvider({ children }: any) {
  const [userIsClient, setUserIsClient] = useState<boolean>(true)
  const [openLoginForm, setOpenLoginForm] = useState<boolean>(true)
  const [loginError, setLoginError] = useState<boolean>(false)
  const [requiredError, setRequiredError] = useState<boolean>(false)
  const [loginAttempts, setLoginAttempts] = useState<number>(0)
  const [accountBlocked, setAccountBlocked] = useState<boolean>(false)
  const [revalidate, setRevalidate] = useState<number>(0)
  const [formData, setFormData] = useState<LoginInterface>({
    email: "",
    password: "",
  })

  const userQuery = userIsClient ? "user=client" : "user=admin"

  const value: any = useMemo(
    () => ({
      userIsClient,
      setUserIsClient,
      openLoginForm,
      setOpenLoginForm,
      loginError,
      setLoginError,
      requiredError,
      setRequiredError,
      loginAttempts,
      setLoginAttempts,
      accountBlocked,
      setAccountBlocked,
      revalidate,
      setRevalidate,
      formData,
      setFormData,
      userQuery,
    }),
    [
      userIsClient,
      openLoginForm,
      loginError,
      requiredError,
      loginAttempts,
      accountBlocked,
      revalidate,
      formData,
      userQuery,
    ],
  )

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}

export default LoginProvider
