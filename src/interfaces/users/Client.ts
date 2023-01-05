interface ClientInterface {
  id?: number
  name: string
  lastName: string
  email: string
  password: string
  identificationType: string
  identificationNumber: string
  phoneAreaCode: string
  phoneNumber: string
  preferences: string
  accountBlocked: number
  subscription: number
  dateCreated: string
}

export default ClientInterface
