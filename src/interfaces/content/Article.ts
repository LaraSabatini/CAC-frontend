export interface CreatedByInterface {
  id: number
  email: string
}

export type FilterType = "themes" | "regions"

export type ExtensionType = "file" | "image" | "video"

export interface ChangesHistoryInterface {
  date: Date | string
  changedBy: CreatedByInterface
  elementChanged: string
}

export interface ArticleFiltersInterface {
  id: number
  value: string
}

export interface AttachmentInterface {
  name: string
  extension: string
  type: ExtensionType
}
interface ArticleInterface {
  id: number
  title: string
  description: string
  createdBy: CreatedByInterface
  changesHistory: ChangesHistoryInterface[] // JSON
  portrait: string
  subtitle: string
  regionFilters: ArticleFiltersInterface[] // JSON
  themeFilters: ArticleFiltersInterface[] // JSON
  regionTitle: string
  regionSubTitle: string
  article: string
  attachments: AttachmentInterface[] // urls[]
  author: string
}

export default ArticleInterface
