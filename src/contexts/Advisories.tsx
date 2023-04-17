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
})

function AdvisoriesProvider({ children }: any) {
  const [advisoryList, setAdvisoryList] = useState<AdvisoryInterface[] | []>([])
  const [publicEventList, setPublicEventList] = useState<
    PublicEventsInterface[] | []
  >([])

  const value: any = useMemo(
    () => ({
      advisoryList,
      setAdvisoryList,
      publicEventList,
      setPublicEventList,
    }),
    [advisoryList, publicEventList],
  )

  return (
    <AdvisoriesContext.Provider value={value}>
      {children}
    </AdvisoriesContext.Provider>
  )
}

export default AdvisoriesProvider
