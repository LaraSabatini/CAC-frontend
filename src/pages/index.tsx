import React, { useEffect } from "react"
import routes from "routes"
import { useRouter } from "next/router"

function Home() {
  const router = useRouter()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (userData === null) {
      router.replace(`${routes.login.name}?${routes.login.queries.client}`)
    } else if (userData.logged) {
      router.replace(routes.dashboard.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>index</div>
}

export default Home
