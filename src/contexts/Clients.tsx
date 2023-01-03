import { createContext, useState, useMemo } from "react"
import defaultClient from "const/defaultValuesForClientContext"
import ClientsContextInterface from "interfaces/contexts/ClientsContextInterface"
import ClientInterface from "interfaces/users/Client"

export const ClientsContext = createContext<ClientsContextInterface>({
  newClient: defaultClient,
  setNewClient: () => {},
  frontValidation: () => false,
})

function ClientsProvider({ children }: any) {
  const [newClient, setNewClient] = useState<ClientInterface>(defaultClient)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const frontValidation = () => {
    if (
      newClient.name === "" ||
      newClient.lastName === "" ||
      newClient.email === "" ||
      newClient.phoneAreaCode === "" ||
      newClient.phoneNumber === "" ||
      newClient.identificationNumber === ""
    ) {
      return false
    }
    return true
  }

  const value: any = useMemo(
    () => ({
      newClient,
      setNewClient,
      frontValidation,
    }),
    [newClient, frontValidation],
  )

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  )
}

export default ClientsProvider
