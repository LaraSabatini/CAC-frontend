import React, { useEffect } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import LoginProvider from "contexts/Login"
import LoginView from "components/Views/Common/LogIn"
import ResetPassword from "components/Views/Common/ResetPassword"

function Login() {
  const router = useRouter()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (userData?.logged) {
      router.replace(routes.dashboard.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {typeof router.query.reset_password === "undefined" ? (
        <LoginProvider>
          <LoginView />
        </LoginProvider>
      ) : (
        <ResetPassword />
      )}
    </>
  )
}

export default Login
