import React from "react"
import AdminInterface from "interfaces/users/Admin"

interface ProfileDataInterface {
  data: AdminInterface
}

function AdminProfile({ data }: ProfileDataInterface) {
  // eslint-disable-next-line no-console
  console.log(data)

  return <div>AdminProfile</div>
}

export default AdminProfile
