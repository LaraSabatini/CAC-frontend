import ArticleInterface from "interfaces/content/Article"

const defaultArticle: ArticleInterface = {
  id: 0,
  title: "",
  description: "",
  createdBy: { id: 0, email: "" },
  changesHistory: [],
  portrait: "",
  subtitle: "",
  regionFilters: [],
  themeFilters: [],
  article: "",
  attachments: [],
  author: "",
}

export default defaultArticle
