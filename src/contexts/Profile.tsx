import { createContext, useState, useMemo } from "react"
import defaultClient from "const/defaultValuesForClientContext"
import { defaultPayment } from "const/defaultValuesForProfileContext"
import ProfileContextInterface from "interfaces/contexts/ProfileContextInterface"
import { PaymentInterface } from "interfaces/payments/Payment"
import ClientInterface from "interfaces/users/Client"
import AdminInterface from "interfaces/users/Admin"

export const ProfileContext = createContext<ProfileContextInterface>({
  profileData: defaultClient,
  setProfileData: () => {},
  payments: [defaultPayment],
  setPayments: () => {},
  triggerUpdate: 0,
  setTriggerUpdate: () => {},
})

function ProfileProvider({ children }: any) {
  const [profileData, setProfileData] = useState<
    ClientInterface | AdminInterface
  >(defaultClient)

  const [payments, setPayments] = useState<PaymentInterface[]>()

  const [triggerUpdate, setTriggerUpdate] = useState<number>(1)

  const value: any = useMemo(
    () => ({
      profileData,
      setProfileData,
      payments,
      setPayments,
      triggerUpdate,
      setTriggerUpdate,
    }),
    [profileData, payments, triggerUpdate],
  )

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export default ProfileProvider
