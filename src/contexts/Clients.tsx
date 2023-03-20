import { createContext, useState, useMemo } from "react"
import defaultClient from "const/defaultValuesForClientContext"
import ClientsContextInterface from "interfaces/contexts/ClientsContextInterface"
import ClientInterface from "interfaces/users/Client"

export const ClientsContext = createContext<ClientsContextInterface>({
  newClient: defaultClient,
  setNewClient: () => {},
  clientSelected: null,
  setClientSelected: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 1,
  setTotalPages: () => {},
  clients: [],
  setClients: () => {},
  plans: [],
  setPlans: () => {},
  profileData: defaultClient,
  setProfileData: () => {},
})

function ClientsProvider({ children }: any) {
  const [newClient, setNewClient] = useState<ClientInterface>(defaultClient)

  const [clients, setClients] = useState<ClientInterface[]>([])

  const [clientSelected, setClientSelected] = useState<number | null>(null)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)

  const [plans, setPlans] = useState<{ id: number; name: string }[]>()

  const [profileData, setProfileData] = useState<ClientInterface>()

  const value: any = useMemo(
    () => ({
      newClient,
      setNewClient,
      clientSelected,
      setClientSelected,
      currentPage,
      setCurrentPage,
      totalPages,
      setTotalPages,
      clients,
      setClients,
      plans,
      setPlans,
      profileData,
      setProfileData,
    }),
    [
      newClient,
      clientSelected,
      currentPage,
      totalPages,
      clients,
      plans,
      profileData,
    ],
  )

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  )
}

export default ClientsProvider
