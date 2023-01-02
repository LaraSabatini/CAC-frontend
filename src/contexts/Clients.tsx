import { createContext, useState, useMemo } from "react"
import defaultClient from "const/defaultValuesForClientContext"
import ClientsContextInterface from "interfaces/contexts/ClientsContextInterface"
import ClientInterface from "interfaces/users/Client"

export const ClientsContext = createContext<ClientsContextInterface>({
  newClient: defaultClient,
  setNewClient: () => {},
})

function ClientsProvider({ children }: any) {
  const [newClient, setNewClient] = useState<ClientInterface>(defaultClient)

  const value: any = useMemo(
    () => ({
      newClient,
      setNewClient,
    }),
    [newClient],
  )

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  )
}

export default ClientsProvider
