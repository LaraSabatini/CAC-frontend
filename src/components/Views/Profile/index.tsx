import React, { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import userData from "const/userData"
import getProfileData from "services/auth/getProfileData.service"
import { ProfileContext } from "contexts/Profile"
import Header from "components/Views/Header"
import AdminProfile from "./Admin"
import ClientProfile from "./Client"

function ProfileView() {
  const router = useRouter()

  const { setProfileData, triggerUpdate } = useContext(ProfileContext)

  const getData = async () => {
    const getProfileDataReq = await getProfileData(userData.type, userData.id)

    if (getProfileDataReq.status === 200 && getProfileDataReq.data.length) {
      setProfileData(getProfileDataReq.data[0])
    } else {
      router.replace("/404")
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
