import { createContext, useState, useMemo } from "react"
import DashboardContextInterface, {
  FilterInterface,
} from "interfaces/contexts/DashboardContextInterface"

export const DashboardContext = createContext<DashboardContextInterface>({
  regionFilters: [],
  setRegionFilters: () => {},
  themeFilters: [],
  setThemeFilters: () => {},
})

function DashboardProvider({ children }: any) {
  const [regionFilters, setRegionFilters] = useState<FilterInterface[] | []>([])

  const [themeFilters, setThemeFilters] = useState<FilterInterface[] | []>([])

  const value: any = useMemo(
    () => ({
      regionFilters,
      setRegionFilters,
      themeFilters,
      setThemeFilters,
    }),
    [regionFilters, themeFilters],
  )

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
