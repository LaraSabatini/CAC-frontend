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
  triggerArticleListUpdate: 0,
  setTriggerArticleListUpdate: () => {},
})

function DashboardProvider({ children }: any) {
  const [articles, setArticles] = useState<ArticleInterface[] | []>([])

  const [regionFilters, setRegionFilters] = useState<FilterInterface[] | []>([])

  const [themeFilters, setThemeFilters] = useState<FilterInterface[] | []>([])

  const [
    triggerArticleListUpdate,
    setTriggerArticleListUpdate,
  ] = useState<number>(0)

  const value: any = useMemo(
    () => ({
      setArticles,
      articles,
      regionFilters,
      setRegionFilters,
      themeFilters,
      setThemeFilters,
      triggerArticleListUpdate,
      setTriggerArticleListUpdate,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [regionFilters, themeFilters, articles, triggerArticleListUpdate],
  )

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
