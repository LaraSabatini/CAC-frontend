import ClientInterface from "interfaces/users/Client"

interface ClientsContextInterface {
  newClient: ClientInterface
  setNewClient(newClient: ClientInterface): void
  clientSelected: number | null
  setClientSelected(clientSelected: number | null): void
  currentPage: number
  setCurrentPage(currentPage: number): void
  totalPages: number
  setTotalPages(totalPages: number): void
  clients: ClientInterface[]
  setClients(clients: ClientInterface[]): void
  plans: { id: number; name: string }[]
  setPlans(plans: { id: number; name: string }[]): void
}
export default ClientsContextInterface
