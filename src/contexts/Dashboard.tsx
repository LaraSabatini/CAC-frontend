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
  removeFileFromList: () => {},
  triggerArticleListUpdate: 0,
  setTriggerArticleListUpdate: () => {},
  imageSelectedForPortrait: null,
  setImageSelectedForPortrait: () => {},
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

  const removeFileFromList = (file: AttachmentInterface) => {
    const fileInDBArray = attachmentsForDataBase.filter(item => item !== file)
    const fileInServerArray = attachmentsForServer.filter(
      item => item.name !== `${file.name}.${file.extension}`,
    )

    setAttachmentsForDataBase(fileInDBArray)
    setAttachmentsForServer(fileInServerArray)
  }

  const [
    triggerArticleListUpdate,
    setTriggerArticleListUpdate,
  ] = useState<number>(0)

  const [imageSelectedForPortrait, setImageSelectedForPortrait] = useState<
    string | null
  >(null)

  const discardNewArticle = () => {
    setNewArticle(defaultArticle)
    setAttachmentsForDataBase([])
    setAttachmentsForServer([])
    setPrevisualize(false)
    setTriggerArticleListUpdate(0)
    setImageSelectedForPortrait(null)
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
      removeFileFromList,
      triggerArticleListUpdate,
      setTriggerArticleListUpdate,
      imageSelectedForPortrait,
      setImageSelectedForPortrait,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      regionFilters,
      themeFilters,
      articles,
      newArticle,
      attachmentsForDataBase,
      previsualize,
      attachmentsForServer,
      triggerArticleListUpdate,
      imageSelectedForPortrait,
    ],
  )

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
