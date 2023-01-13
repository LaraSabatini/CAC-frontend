import React, { useEffect } from "react"
import { useRouter } from "next/router"
import LoginView from "components/Views/LogInView"

function Login() {
  const router = useRouter()

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      router.replace({
        query: {
          client: true,
        },
      })
    }
  }, [router])

  return <LoginView />
}

export default Login
