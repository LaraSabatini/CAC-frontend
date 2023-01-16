import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

function Home() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData") as string)

    if (userData !== null) {
      setIsLoggedIn(userData.logged)
    } else {
      router.replace(`/login?client=true`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(`/dashboard`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return <div>index</div>
}

export default Home
