import ArticleInterface, {
  AttachmentInterface,
} from "interfaces/content/Article"

export interface FilterInterface {
  id: number
  value: string
}

interface DashboardContextInterface {
  regionFilters: FilterInterface[]
  setRegionFilters(regionFilters: FilterInterface[]): void
  themeFilters: FilterInterface[]
  setThemeFilters(themeFilters: FilterInterface[]): void
  articles: ArticleInterface[]
  setArticles(articles: ArticleInterface[]): void
  newArticle: ArticleInterface
  setNewArticle(newArticle: ArticleInterface): void
  attachments: AttachmentInterface[]
  setAttachments(attachments: AttachmentInterface[]): void
  previsualize: boolean
  setPrevisualize(previsualize: boolean): void
}

export default DashboardContextInterface
