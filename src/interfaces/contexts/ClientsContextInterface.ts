import ClientInterface from "interfaces/users/Client"

interface ClientsContextInterface {
  newClient: ClientInterface
  setNewClient(newClient: ClientInterface): void
  frontValidation: () => boolean
}
export default ClientsContextInterface
