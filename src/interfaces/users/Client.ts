import { UserInterface } from "./General"

interface ClientInterface extends UserInterface {
  name: string
  lastName: string
  identificationType: string
  identificationNumber: string
  phoneAreaCode: string
  phoneNumber: string
  preferences: string
  subscription: number
  dateCreated: string
  plan: number
  region: number
  paymentDate: string
  paymentExpireDate: string
}

export default ClientInterface
