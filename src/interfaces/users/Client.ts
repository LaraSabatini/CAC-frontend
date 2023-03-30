import { UserInterface } from "./General"

interface ClientInterface extends UserInterface {
  name: string
  lastName: string
  identificationType: string
  identificationNumber: string
  phoneAreaCode: string
  phoneNumber: string
  preferences: string
  subscription: number | null
  dateCreated: string
  plan: number | null
  region: number
  paymentDate: string | null
  paymentExpireDate: string | null
  mpId: string
}

export default ClientInterface
