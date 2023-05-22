import ArticleInterface, {
  AttachmentInterface,
} from "interfaces/content/Article"

interface ArticleContextInterface {
  newArticle: ArticleInterface
  setNewArticle(newArticle: ArticleInterface): void
  attachmentsForDataBase: AttachmentInterface[] | []
  setAttachmentsForDataBase(
    attachmentsForDataBase: AttachmentInterface[] | [],
  ): void
  previsualize: boolean
  setPrevisualize(previsualize: boolean): void
  attachmentsForServer: File[] | []
  setAttachmentsForServer(attachmentsForServer: File[] | []): void
  discardNewArticle(): void
  removeFileFromList(arg: AttachmentInterface, action: "edit" | "create"): void
  imageSelectedForPortrait: string | null
  setImageSelectedForPortrait(imageSelectedForPortrait: string | null): void
  articleSelected: ArticleInterface | null
  setArticleSelected(articleSelected: ArticleInterface | null): void
  articleEdited: ArticleInterface
  setArticleEdited(articleEdited: ArticleInterface): void
  previsualizeEdit: boolean
  setPrevisualizeEdit(previsualizeEdit: boolean): void
  portrait: string | null
  setPortrait(portrait: string | null): void
  newAttachmentsForDataBase: AttachmentInterface[] | []
  setNewAttachmentsForDataBase(
    newAttachmentsForDataBase: AttachmentInterface[] | [],
  ): void
  newAttachmentsForServer: File[] | []
  setNewAttachmentsForServer(newAttachmentsForServer: File[] | []): void
  discardArticleEdition(): void
}
export default ArticleContextInterface
