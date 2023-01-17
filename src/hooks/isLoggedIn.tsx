import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { UserDataType } from "interfaces/users/General"

function useUserStatus(userData: UserDataType) {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)

  useEffect(() => {
    if (userData !== null) {
      setIsLoggedIn(userData.logged)
    } else {
      router.replace(`/login?client=true`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isLoggedIn
}

export default useUserStatus
