import { createContext, useState, useMemo } from "react"
import DashboardContextInterface, {
  FilterInterface,
} from "interfaces/contexts/DashboardContextInterface"
import ArticleInterface from "interfaces/content/Article"

export const DashboardContext = createContext<DashboardContextInterface>({
  articles: [],
  setArticles: () => {},
  themeFilters: [],
  setThemeFilters: () => {},
  triggerArticleListUpdate: 0,
  setTriggerArticleListUpdate: () => {},
  serverError: false,
  setServerError: () => {},
})

function DashboardProvider({ children }: any) {
  const [articles, setArticles] = useState<ArticleInterface[] | []>([])

  const [themeFilters, setThemeFilters] = useState<FilterInterface[] | []>([])

  const [
    triggerArticleListUpdate,
    setTriggerArticleListUpdate,
  ] = useState<number>(0)

  const [serverError, setServerError] = useState<boolean>(false)

  const value: any = useMemo(
    () => ({
      setArticles,
      articles,
      themeFilters,
      setThemeFilters,
      triggerArticleListUpdate,
      setTriggerArticleListUpdate,
      serverError,
      setServerError,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeFilters, articles, triggerArticleListUpdate, serverError],
  )

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
