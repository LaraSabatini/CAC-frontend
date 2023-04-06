export interface DataInterface {
  name: string
  lastName: string
  identificationType: string
  identificationNumber: string
  phoneAreaCode: string
  phoneNumber: string
  email: string
  region: number
  realEstateRegistration: string
}

export interface EditPersonalInfoInterface {
  cancelChanges: (arg?: any) => void
  regions?: { id: number; value: string }[]
}
