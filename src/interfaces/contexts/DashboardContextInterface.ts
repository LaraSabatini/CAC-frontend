import ArticleInterface, {
  AttachmentInterface,
} from "interfaces/content/Article"

export interface FilterInterface {
  id: number
  value: string
}

interface DashboardContextInterface {
  regionFilters: FilterInterface[] | []
  setRegionFilters(regionFilters: FilterInterface[] | []): void
  themeFilters: FilterInterface[] | []
  setThemeFilters(themeFilters: FilterInterface[] | []): void
  articles: ArticleInterface[] | []
  setArticles(articles: ArticleInterface[] | []): void
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
  removeFileFromList(arg: AttachmentInterface): void
  triggerArticleListUpdate: number
  setTriggerArticleListUpdate(triggerArticleListUpdate: number): void
  imageSelectedForPortrait: string | null
  setImageSelectedForPortrait(imageSelectedForPortrait: string | null): void
}

export default DashboardContextInterface
