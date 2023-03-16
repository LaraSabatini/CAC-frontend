import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import routes from "routes"
import ClientsProvider from "contexts/Clients"
import PartnersView from "components/Views/Admin/Partners"

function Partners() {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState<boolean>(false)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") as string)

    if (userData === null) {
      router.replace(`${routes.login.name}?${routes.login.queries.admin}`)
    } else if (userData?.logged) {
      setIsLogged(userData.logged)
      if (userData.type !== "admin") {
        router.replace(`${routes.dashboard.name}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isLogged && (
        <ClientsProvider>
          <PartnersView />
        </ClientsProvider>
      )}
    </div>
  )
}

export default Partners
