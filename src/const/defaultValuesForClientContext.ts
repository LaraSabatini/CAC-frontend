import ClientInterface from "interfaces/users/Client"

const defaultClient: ClientInterface = {
  id: 0,
  name: "",
  lastName: "",
  email: "",
  password: "",
  identificationType: "DNI",
  identificationNumber: "",
  phoneAreaCode: "",
  phoneNumber: "",
  preferences: "[]",
  accountBlocked: 0,
  subscription: 1,
  dateCreated: "",
  loginAttempts: 0,
  firstLogin: 1,
  plan: 1,
  region: 1,
  paymentDate: "",
  paymentExpireDate: "",
}

export default defaultClient
