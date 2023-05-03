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
  region: string
  paymentDate: string | null
  paymentExpireDate: string | null
  mpId: string
  savedArticles: number[] | string
  realEstateRegistration: string
  activityStartDate: string
  amountOfBuildings: string
  birthdate: string
}

export default ClientInterface
