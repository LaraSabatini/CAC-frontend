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
  attachmentsForDataBase: [],
  setAttachmentsForDataBase: () => {},
  previsualize: false,
  setPrevisualize: () => {},
  attachmentsForServer: [],
  setAttachmentsForServer: () => {},
  discardNewArticle: () => {},
})

function DashboardProvider({ children }: any) {
  const [regionFilters, setRegionFilters] = useState<FilterInterface[] | []>([])

  const [themeFilters, setThemeFilters] = useState<FilterInterface[] | []>([])

  const [articles, setArticles] = useState<ArticleInterface[] | []>([])

  // *** Article creation
  const [newArticle, setNewArticle] = useState<ArticleInterface>(defaultArticle)

  const [attachmentsForDataBase, setAttachmentsForDataBase] = useState<
    AttachmentInterface[] | []
  >([])

  const [attachmentsForServer, setAttachmentsForServer] = useState<File[] | []>(
    [],
  )

  const [previsualize, setPrevisualize] = useState<boolean>(false)

  const discardNewArticle = () => {
    setNewArticle(defaultArticle)
    setAttachmentsForDataBase([])
    setAttachmentsForServer([])
    setPrevisualize(false)
  }

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
      attachmentsForDataBase,
      setAttachmentsForDataBase,
      previsualize,
      setPrevisualize,
      attachmentsForServer,
      setAttachmentsForServer,
      discardNewArticle,
    }),
    [
      regionFilters,
      themeFilters,
      articles,
      newArticle,
      attachmentsForDataBase,
      previsualize,
      attachmentsForServer,
    ],
  )

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
