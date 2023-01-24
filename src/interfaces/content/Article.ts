export interface CreatedByInterface {
  id: number
  email: string
}

export interface ChangesHistoryInterface {
  date: Date | string
  changedBy: CreatedByInterface
  elementChanged: string
}

export interface ArticleFiltersInterface {
  id: number
  value: string
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
  attachments: string[] // urls[]
  author: string
}

export default ArticleInterface
