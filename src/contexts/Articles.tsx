import { createContext, useState, useMemo } from "react"
import ArticleInterface, {
  AttachmentInterface,
} from "interfaces/content/Article"
import defaultArticle from "const/defaultArticle"
import ArticleContextInterface from "interfaces/contexts/ArtitclesContextInterface"

export const ArticlesContext = createContext<ArticleContextInterface>({
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
  articleSelected: null,
  setArticleSelected: () => {},
  articleEdited: defaultArticle,
  setArticleEdited: () => {},
  previsualizeEdit: false,
  setPrevisualizeEdit: () => {},
  portrait: null,
  setPortrait: () => {},
  newAttachmentsForDataBase: [],
  setNewAttachmentsForDataBase: () => {},
  newAttachmentsForServer: [],
  setNewAttachmentsForServer: () => {},
  discardArticleEdition: () => {},
})

function ArticlesProvider({ children }: any) {
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

  // *** Article edition
  const [
    articleSelected,
    setArticleSelected,
  ] = useState<ArticleInterface | null>(null)

  const [articleEdited, setArticleEdited] = useState<ArticleInterface>(
    defaultArticle,
  )

  const [previsualizeEdit, setPrevisualizeEdit] = useState<boolean>(false)

  const [portrait, setPortrait] = useState<string | null>(null)

  const [newAttachmentsForDataBase, setNewAttachmentsForDataBase] = useState<
    AttachmentInterface[] | []
  >([])

  const [newAttachmentsForServer, setNewAttachmentsForServer] = useState<
    File[] | []
  >([])

  const discardArticleEdition = () => {
    setArticleSelected(null)
    setArticleEdited(defaultArticle)
    setPortrait(null)
    setNewAttachmentsForDataBase([])
    setNewAttachmentsForServer([])
  }

  const value: any = useMemo(
    () => ({
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
      articleSelected,
      setArticleSelected,
      articleEdited,
      setArticleEdited,
      previsualizeEdit,
      setPrevisualizeEdit,
      portrait,
      setPortrait,
      newAttachmentsForDataBase,
      setNewAttachmentsForDataBase,
      newAttachmentsForServer,
      setNewAttachmentsForServer,
      discardArticleEdition,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      articles,
      newArticle,
      attachmentsForDataBase,
      previsualize,
      attachmentsForServer,
      triggerArticleListUpdate,
      imageSelectedForPortrait,
      articleSelected,
      articleEdited,
      previsualizeEdit,
      portrait,
      newAttachmentsForDataBase,
      newAttachmentsForServer,
    ],
  )

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  )
}

export default ArticlesProvider
