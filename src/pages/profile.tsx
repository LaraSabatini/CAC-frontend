import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import ProfileView from "components/Views/Profile"

function Profile() {
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
  return <div>{isLoggedIn && <ProfileView />}</div>
}

export default Profile
