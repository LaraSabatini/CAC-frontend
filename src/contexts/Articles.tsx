import { createContext, useState, useMemo } from "react"
import ArticleInterface, {
  AttachmentInterface,
} from "interfaces/content/Article"
import defaultArticle from "const/defaultArticle"
import ArticleContextInterface from "interfaces/contexts/ArtitclesContextInterface"

export const ArticlesContext = createContext<ArticleContextInterface>({
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
  // *** Article creation
  const [newArticle, setNewArticle] = useState<ArticleInterface>(defaultArticle)

  const [attachmentsForDataBase, setAttachmentsForDataBase] = useState<
    AttachmentInterface[] | []
  >([])

  const [attachmentsForServer, setAttachmentsForServer] = useState<File[] | []>(
    [],
  )

  const [previsualize, setPrevisualize] = useState<boolean>(false)

  const [imageSelectedForPortrait, setImageSelectedForPortrait] = useState<
    string | null
  >(null)

  const discardNewArticle = () => {
    setNewArticle(defaultArticle)
    setAttachmentsForDataBase([])
    setAttachmentsForServer([])
    setPrevisualize(false)
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

  const removeFileFromList = (
    file: AttachmentInterface,
    action: "edit" | "create",
  ) => {
    if (action === "create") {
      const fileInDBArray = attachmentsForDataBase.filter(item => item !== file)
      const fileInServerArray = attachmentsForServer.filter(
        item => item.name !== `${file.name}.${file.extension}`,
      )

      setAttachmentsForDataBase(fileInDBArray)
      setAttachmentsForServer(fileInServerArray)
    } else {
      const fileInDBArray = newAttachmentsForDataBase.filter(
        item => item !== file,
      )
      const fileInServerArray = newAttachmentsForServer.filter(
        item => item.name !== `${file.name}.${file.extension}`,
      )

      setNewAttachmentsForDataBase(fileInDBArray)
      setNewAttachmentsForServer(fileInServerArray)
    }
  }

  const value: any = useMemo(
    () => ({
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
      newArticle,
      attachmentsForDataBase,
      previsualize,
      attachmentsForServer,
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
