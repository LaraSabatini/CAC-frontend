import React, { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import getProfileData from "services/auth/getProfileData.service"
import { ProfileContext } from "contexts/Profile"
import Header from "components/Views/Header"
import AdminProfile from "./Admin"
import ClientProfile from "./Client"

function ProfileView() {
  const router = useRouter()

  const { setProfileData, triggerUpdate } = useContext(ProfileContext)

  const userData = JSON.parse(sessionStorage.getItem("userData") as string)

  const getData = async () => {
    const req = await getProfileData(userData.type, userData.id)

    if (req.status === 200 && req.data.length) {
      setProfileData(req.data[0])
    } else {
      router.replace("/404") // cambiar
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerUpdate])

  return (
    <>
      <Header />
      {userData.type === "admin" ? <AdminProfile /> : <ClientProfile />}
    </>
  )
}

export default ProfileView
