export interface CreatedByInterface {
  id: number
  email: string
}

export type ExtensionType = "file" | "image" | "video"

export type ContentType = "card" | "content" | "attachments"

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

export interface AttachmentViewInterface {
  name: string
  extension: string
  type: ExtensionType
  uri: string
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
  regionFilters: number[] | string | ArticleFiltersInterface[]
  themeFilters: number[] | string | ArticleFiltersInterface[]
  article: string
  attachments: AttachmentInterface[] | string // urls[]
  author: string
  saved: number
}

export default ArticleInterface
