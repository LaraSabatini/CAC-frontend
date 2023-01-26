import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { BsChevronRight } from "react-icons/bs"
import { getArticles } from "services/articles/articles.service"
import { DashboardContext } from "contexts/Dashboard"
import { getFilters } from "services/articles/filters.service"
import Header from "components/Views/Header"
import { FullArticle, ArticlesContainer, Chip } from "./styles"
import ArticleView from "../Articles/ArticleCard"
import ArticleBody from "../Articles/ArticleBody"

function DashboardView() {
  const router = useRouter()

  const { articleId } = router.query

  const {
    setRegionFilters,
    setThemeFilters,
    setArticles,
    articles,
  } = useContext(DashboardContext)

  const getFiltersData = async () => {
    const getFiltersRegion = await getFilters("regions")
    const getFiltersThemes = await getFilters("themes")

    setRegionFilters(getFiltersRegion.data)
    setThemeFilters(getFiltersThemes.data)

    const getArticlesReq = await getArticles(1)

    setArticles(getArticlesReq.data)
  }

  useEffect(() => {
    getFiltersData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />

      {articleId === undefined ? (
        <ArticlesContainer>
          {articles.length &&
            articles.map(article => <ArticleView article={article} />)}
        </ArticlesContainer>
      ) : (
        <FullArticle>
          <Chip>
            <a href="http://localhost:3000/dashboard">Articulos</a>
            <BsChevronRight />
            <span>{router.query.title}</span>
          </Chip>
          <ArticleBody showImageVisualizer queries />
        </FullArticle>
      )}
    </>
  )
}

export default DashboardView
