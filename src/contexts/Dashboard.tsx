import { createContext, useState, useMemo } from "react"
import DashboardContextInterface, {
  FilterInterface,
} from "interfaces/contexts/DashboardContextInterface"
import ArticleInterface from "interfaces/content/Article"

export const DashboardContext = createContext<DashboardContextInterface>({
  articles: [],
  setArticles: () => {},
  regionFilters: [],
  setRegionFilters: () => {},
  themeFilters: [],
  setThemeFilters: () => {},
})

function DashboardProvider({ children }: any) {
  const [articles, setArticles] = useState<ArticleInterface[] | []>([])

  const [regionFilters, setRegionFilters] = useState<FilterInterface[] | []>([])

  const [themeFilters, setThemeFilters] = useState<FilterInterface[] | []>([])

  const value: any = useMemo(
    () => ({
      setArticles,
      articles,
      regionFilters,
      setRegionFilters,
      themeFilters,
      setThemeFilters,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [regionFilters, themeFilters, articles],
  )

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
