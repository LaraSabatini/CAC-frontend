import React, { useEffect, useContext, useState } from "react"
import userData from "const/userData"
import getProfileData from "services/auth/getProfileData.service"
import { ProfileContext } from "contexts/Profile"
import InternalServerError from "components/Views/Error/InternalServerError"

import Header from "components/Views/Header"
import AdminProfile from "./Admin"
import ClientProfile from "./Client"

function ProfileView() {
  const { setProfileData, triggerUpdate } = useContext(ProfileContext)
  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const getData = async () => {
    const getProfileDataReq = await getProfileData(userData.type, userData.id)

    if (getProfileDataReq.status === 200 && getProfileDataReq.data.length) {
      setProfileData(getProfileDataReq.data[0])
    } else {
      setServerErrorModal(true)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerUpdate])

  return (
    <>
      <Header />
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      {userData.type === "admin" ? <AdminProfile /> : <ClientProfile />}
    </>
  )
}

export default ProfileView
