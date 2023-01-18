import React, { useEffect } from "react"
import { useRouter } from "next/router"

function Home() {
  const router = useRouter()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (userData === null) {
      router.replace("/login?client=true")
    } else if (userData.logged) {
      router.replace("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>index</div>
}

export default Home
