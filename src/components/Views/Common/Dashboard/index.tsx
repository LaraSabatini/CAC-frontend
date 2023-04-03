import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { BsChevronRight } from "react-icons/bs"
import { getArticles } from "services/articles/articles.service"
import { DashboardContext } from "contexts/Dashboard"
import { getFilters } from "services/articles/filters.service"
import Header from "@components/Views/Common/Header"
import { FullArticle, ArticlesContainer, Chip, EmptyPage } from "./styles"
import ArticleView from "../Articles/ArticleCard"
import ArticleBody from "../Articles/ArticleBody"

function DashboardView() {
  const router = useRouter()

  const { articleId } = router.query

  const {
    setThemeFilters,
    setArticles,
    articles,
    triggerArticleListUpdate,
  } = useContext(DashboardContext)

  const getFiltersData = async () => {
    const getFiltersThemes = await getFilters("themes")

    setThemeFilters(getFiltersThemes.data)

    const getArticlesReq = await getArticles(1)

    setArticles(getArticlesReq.data)
  }

  useEffect(() => {
    getFiltersData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerArticleListUpdate])

  return (
    <>
      <Header />

      {articleId === undefined ? (
        <ArticlesContainer>
          {articles.length ? (
            articles.map(article => (
              <ArticleView
                region={JSON.parse(article.regionFilters as string)[0]}
                article={article}
              />
            ))
          ) : (
            <EmptyPage>No hay articulos para mostrar</EmptyPage>
          )}
        </ArticlesContainer>
      ) : (
        <FullArticle>
          <Chip>
            <a href="https://cac-frontend-git-feat-update-payment-larasabatini.vercel.app/dashboard">
              Articulos
            </a>
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
