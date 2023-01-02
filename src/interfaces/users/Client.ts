interface ClientInterface {
  id: number
  userName: string
  email: string
  password: string
  phone: {
    area_code: string
    number: string
  }
  identification: {
    type: string
    number: string
  }
  dateCreated: string
  preferences: number[]
  accountBlocked: number
  subscription: number
}

export default ClientInterface
