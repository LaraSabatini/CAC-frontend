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
  accountBlocked: false,
  subscription: true,
  dateCreated: "",
}

export default defaultClient
