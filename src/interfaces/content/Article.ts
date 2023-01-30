export interface CreatedByInterface {
  id: number
  email: string
}

export type FilterType = "themes" | "regions"

export type ExtensionType = "file" | "image" | "video"

export interface ChangesHistoryInterface {
  date: Date | string
  changedBy: CreatedByInterface
  action: "CREATED" | "MODIFIED"
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

export interface OptionsInterface {
  id: number
  value: string
}
interface ArticleInterface {
  id: number
  title: string
  description: string
  createdBy: CreatedByInterface | string
  changesHistory: ChangesHistoryInterface[] | string // JSON
  portrait: string
  subtitle: string
  regionFilters: ArticleFiltersInterface[] | string // JSON
  themeFilters: ArticleFiltersInterface[] | string // JSON
  article: string
  attachments: AttachmentInterface[] | string // urls[]
  author: string
}

export default ArticleInterface
