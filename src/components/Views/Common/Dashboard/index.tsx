import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import {
  getSavedArticles,
  editSavedArticles,
} from "services/clients/clientActions.service"
import { BsChevronRight } from "react-icons/bs"
import { getArticles, editSavedTimes } from "services/articles/articles.service"
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

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [savedArticles, setSavedArticles] = useState<number[]>([])
  const [updateList, setUpdateList] = useState<number>(0)

  const getFiltersData = async () => {
    const getFiltersThemes = await getFilters()
    setThemeFilters(getFiltersThemes.data)

    const getArticlesReq = await getArticles(1)
    setArticles(getArticlesReq.data)
  }

  useEffect(() => {
    getFiltersData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerArticleListUpdate])

  const updateSavedArticlesList = async (list: number[]) => {
    const update = await editSavedArticles(userData.id, JSON.stringify(list))

    if (update.status === 201) {
      setUpdateList(updateList + 1)
    }
  }

  const toggleSave = async (id: number, amountOfSaved: number) => {
    if (savedArticles.includes(id)) {
      await editSavedTimes(id, "remove", amountOfSaved)
      const index = savedArticles.indexOf(id)

      const newArrayOfSavedArticles = savedArticles
      newArrayOfSavedArticles.splice(index, 1)

      await updateSavedArticlesList(newArrayOfSavedArticles)
    } else {
      await editSavedTimes(id, "add", amountOfSaved)

      const newArrayOfSavedArticles = savedArticles
      newArrayOfSavedArticles.push(id)

      await updateSavedArticlesList(newArrayOfSavedArticles)
    }
  }

  const handleSavedArticles = async () => {
    const getSavedArticlesCall = await getSavedArticles(userData.id)
    setSavedArticles(
      getSavedArticlesCall.data !== "" &&
        getSavedArticlesCall.data !== "undefined"
        ? JSON.parse(getSavedArticlesCall.data)
        : [],
    )
  }

  useEffect(() => {
    handleSavedArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />

      {articleId === undefined ? (
        <ArticlesContainer>
          {articles.length ? (
            articles.map(article => (
              <ArticleView
                key={article.id}
                region={JSON.parse(article.regionFilters as string)[0]}
                article={article}
                saved={savedArticles.includes(article.id)}
                toggleSave={() => toggleSave(article.id, article.saved)}
                savedTimes={article.saved}
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
