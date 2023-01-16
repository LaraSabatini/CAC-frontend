import React from "react"
import userData from "const/userData"
import useUserStatus from "hooks/isLoggedIn"
import ProfileProvider from "contexts/Profile"
import ProfileView from "components/Views/Profile"

function Profile() {
  const isLoggedIn = useUserStatus(userData)

  return (
    <div>
      {isLoggedIn && (
        <ProfileProvider>
          <ProfileView />
        </ProfileProvider>
      )}
    </div>
  )
}

export default Profile
