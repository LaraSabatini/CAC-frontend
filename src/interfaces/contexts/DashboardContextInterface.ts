import ArticleInterface from "interfaces/content/Article"

export interface FilterInterface {
  id: number
  value: string
}

interface DashboardContextInterface {
  articles: ArticleInterface[] | []
  setArticles(articles: ArticleInterface[] | []): void
  regionFilters: FilterInterface[] | []
  setRegionFilters(regionFilters: FilterInterface[] | []): void
  themeFilters: FilterInterface[] | []
  setThemeFilters(themeFilters: FilterInterface[] | []): void
}

export default DashboardContextInterface
