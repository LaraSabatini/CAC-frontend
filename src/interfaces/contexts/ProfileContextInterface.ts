import ClientInterface from "interfaces/users/Client"
import { PaymentInterface } from "interfaces/payments/Payment"
import { AdminInterface } from "interfaces/users/Admin"

interface ProfileContextInterface {
  profileData: ClientInterface | AdminInterface
  setProfileData(profileData: ClientInterface | AdminInterface): void
  payments: PaymentInterface[]
  setPayments(payments: PaymentInterface[]): void
  triggerUpdate: number
  setTriggerUpdate(triggerUpdate: number): void
}
export default ProfileContextInterface
