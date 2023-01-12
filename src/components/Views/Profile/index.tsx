import React, { useEffect, useState } from "react"
import getProfileData from "services/auth/getProfileData.service"
import AdminInterface from "interfaces/users/Admin"
import ClientInterface from "interfaces/users/Client"
import Header from "components/Views/Header"
import { useRouter } from "next/router"
import AdminProfile from "./Admin"
import ClientProfile from "./Client"

function ProfileView() {
  const router = useRouter()

  const userData = JSON.parse(sessionStorage.getItem("userData") as string)

  const [profileData, setProfileData] = useState<
    AdminInterface | ClientInterface
  >()

  const getData = async () => {
    const req = await getProfileData(userData.type, userData.id)

    if (req.status === 200 && req.data.length) {
      setProfileData(req.data[0])
    } else {
      router.replace("/404")
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      {userData.type === "admin" ? (
        <AdminProfile data={profileData as AdminInterface} />
      ) : (
        <ClientProfile profile={profileData as ClientInterface} />
      )}
    </>
  )
}

export default ProfileView
