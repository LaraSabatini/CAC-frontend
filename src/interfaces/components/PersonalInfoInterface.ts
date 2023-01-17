export interface DataInterface {
  name: string
  lastName: string
  identificationType: string
  identificationNumber: string
  phoneAreaCode: string
  phoneNumber: string
  email: string
}

export interface EditPersonalInfoInterface {
  cancelChanges: (arg?: any) => void
}
