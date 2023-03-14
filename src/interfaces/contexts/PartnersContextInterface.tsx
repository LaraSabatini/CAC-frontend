import ClientInterface from "interfaces/users/Client"

interface PartnersContextInterface {
  newClient: ClientInterface
  setNewClient(newClient: ClientInterface): void
}
export default PartnersContextInterface
