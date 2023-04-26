import ArticleInterface from "interfaces/content/Article"

export interface FilterInterface {
  id: number
  value: string
}

interface DashboardContextInterface {
  articles: ArticleInterface[] | []
  setArticles(articles: ArticleInterface[] | []): void
  themeFilters: FilterInterface[] | []
  setThemeFilters(themeFilters: FilterInterface[] | []): void
  triggerArticleListUpdate: number
  setTriggerArticleListUpdate(triggerArticleListUpdate: number): void
  serverError: boolean
  setServerError(serverError: boolean): void
}

export default DashboardContextInterface
