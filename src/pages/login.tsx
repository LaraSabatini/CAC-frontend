import React, { useEffect } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import LoginProvider from "contexts/Login"
import LoginView from "components/Views/LogInView"

function Login() {
  const router = useRouter()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (Object.keys(router.query).length === 0) {
      router.replace({
        query: {
          client: true,
        },
      })
    }

    if (userData?.logged) {
      router.replace(routes.dashboard.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LoginProvider>
      <LoginView />
    </LoginProvider>
  )
}

export default Login
