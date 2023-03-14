import React, { useEffect, useContext, useState } from "react"
import { getProfileData } from "services/auth/getProfileData.service"
import { ProfileContext } from "contexts/Profile"
import InternalServerError from "components/Views/Error/InternalServerError"
import Header from "components/Views/Header"
import AdminProfile from "./Admin"
import ClientProfile from "./Client"

function ProfileView() {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const { setProfileData, triggerUpdate } = useContext(ProfileContext)
  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const getUserData = async () => {
    const getProfileDataReq = await getProfileData(userData.type, userData.id)

    if (getProfileDataReq.status === 200 && getProfileDataReq.data.length) {
      setProfileData(getProfileDataReq.data[0])
      if (userData.type !== "client") {
        setProfileData({
          ...getProfileDataReq.data[0],
          accessPermits: JSON.parse(getProfileDataReq.data[0].accessPermits)[0],
        })
      }
    } else {
      setServerErrorModal(true)
    }
  }

  useEffect(() => {
    getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerUpdate])

  return (
    <>
      <Header />
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      {userData.type === "client" ? <ClientProfile /> : <AdminProfile />}
    </>
  )
}

export default ProfileView
