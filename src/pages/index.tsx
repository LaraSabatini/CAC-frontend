import React, { useEffect } from "react"
import { useRouter } from "next/router"
import useUserStatus from "hooks/isLoggedIn"
import userData from "const/userData"

function Home() {
  const router = useRouter()

  const isLoggedIn = useUserStatus(userData)

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(`/dashboard`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return <div>index</div>
}

export default Home
