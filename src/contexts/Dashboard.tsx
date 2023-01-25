import { createContext, useState, useMemo } from "react"
import DashboardContextInterface, {
  FilterInterface,
} from "interfaces/contexts/DashboardContextInterface"
import ArticleInterface, {
  AttachmentInterface,
} from "interfaces/content/Article"
import defaultArticle from "const/defaultArticle"

export const DashboardContext = createContext<DashboardContextInterface>({
  regionFilters: [],
  setRegionFilters: () => {},
  themeFilters: [],
  setThemeFilters: () => {},
  articles: [],
  setArticles: () => {},
  newArticle: defaultArticle,
  setNewArticle: () => {},
  attachments: [],
  setAttachments: () => {},
  previsualize: false,
  setPrevisualize: () => {},
})

function DashboardProvider({ children }: any) {
  const [regionFilters, setRegionFilters] = useState<FilterInterface[] | []>([])

  const [themeFilters, setThemeFilters] = useState<FilterInterface[] | []>([])

  const [articles, setArticles] = useState<ArticleInterface[] | []>([])

  // *** Article creation
  const [newArticle, setNewArticle] = useState<ArticleInterface>(defaultArticle)

  const [attachments, setAttachments] = useState<AttachmentInterface[] | []>([])

  const [previsualize, setPrevisualize] = useState<boolean>(false)

  const value: any = useMemo(
    () => ({
      regionFilters,
      setRegionFilters,
      themeFilters,
      setThemeFilters,
      setArticles,
      articles,
      newArticle,
      setNewArticle,
      attachments,
      setAttachments,
      previsualize,
      setPrevisualize,
    }),
    [
      regionFilters,
      themeFilters,
      articles,
      newArticle,
      attachments,
      previsualize,
    ],
  )

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
