import { createContext, useMemo, useState } from "react"
import {
  AdvisoryInterface,
  PublicEventsInterface,
} from "interfaces/content/Advisories"
import AdvisoryContextInterface from "interfaces/contexts/AdvisoryContextInterface"

export const AdvisoriesContext = createContext<AdvisoryContextInterface>({
  advisoryList: [],
  setAdvisoryList: () => {},
  publicEventList: [],
  setPublicEventList: () => {},
  serverError: false,
  setServerError: () => {},
})

function AdvisoriesProvider({ children }: any) {
  const [advisoryList, setAdvisoryList] = useState<AdvisoryInterface[] | []>([])
  const [publicEventList, setPublicEventList] = useState<
    PublicEventsInterface[] | []
  >([])
  const [serverError, setServerError] = useState<boolean>(false)

  const value: any = useMemo(
    () => ({
      advisoryList,
      setAdvisoryList,
      publicEventList,
      setPublicEventList,
      serverError,
      setServerError,
    }),
    [advisoryList, publicEventList, serverError],
  )

  return (
    <AdvisoriesContext.Provider value={value}>
      {children}
    </AdvisoriesContext.Provider>
  )
}

export default AdvisoriesProvider
