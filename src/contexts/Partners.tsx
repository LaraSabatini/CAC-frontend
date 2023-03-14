import { createContext, useState, useMemo } from "react"
import defaultClient from "const/defaultValuesForClientContext"
import PartnersContextInterface from "interfaces/contexts/PartnersContextInterface"
import ClientInterface from "interfaces/users/Client"

export const PartnersContext = createContext<PartnersContextInterface>({
  newClient: defaultClient,
  setNewClient: () => {},
})

function PartnersProvider({ children }: any) {
  const [newClient, setNewClient] = useState<ClientInterface>(defaultClient)

  const value: any = useMemo(
    () => ({
      newClient,
      setNewClient,
    }),
    [newClient],
  )

  return (
    <PartnersContext.Provider value={value}>
      {children}
    </PartnersContext.Provider>
  )
}

export default PartnersProvider
