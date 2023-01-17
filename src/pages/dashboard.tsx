import React from "react"
import userData from "const/userData"
import useUserStatus from "hooks/isLoggedIn"
import usePaymentStatus from "hooks/usePaymentStatus"
import DashboardView from "components/Views/Dashboard"

function Dashboard() {
  const isLoggedIn = useUserStatus(userData)

  usePaymentStatus(userData)

  return <div>{isLoggedIn && <DashboardView />}</div>
}

export default Dashboard
