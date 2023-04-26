import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import {
  getSavedArticles,
  editSavedArticles,
} from "services/clients/clientActions.service"
import { BsChevronRight } from "react-icons/bs"
import { getArticles, editSavedTimes } from "services/articles/articles.service"
import { DashboardContext } from "contexts/Dashboard"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import { getFilters } from "services/articles/filters.service"
import Header from "@components/Views/Common/Header"
import Button from "components/UI/Button"
import {
  FullArticle,
  ArticlesContainer,
  Chip,
  EmptyPage,
  ButtonContainer,
} from "./styles"
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
    serverError,
    setServerError,
  } = useContext(DashboardContext)

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [savedArticles, setSavedArticles] = useState<number[]>([])
  const [updateList, setUpdateList] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const getFiltersData = async () => {
    const getFiltersThemes = await getFilters()
    if (getFiltersThemes.status === 200) {
      setThemeFilters(getFiltersThemes.data)
    } else {
      setServerError(true)
    }

    const getArticlesReq = await getArticles(currentPage)

    if (getArticlesReq.status === 200) {
      setArticles(getArticlesReq.data)

      if (articles.length > 0) {
        setArticles(articles.concat(getArticlesReq.data))
      } else {
        setArticles(getArticlesReq.data)
      }
    } else {
      setServerError(true)
    }
  }

  useEffect(() => {
    getFiltersData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerArticleListUpdate, currentPage])

  const updateSavedArticlesList = async (list: number[]) => {
    const update = await editSavedArticles(userData.id, JSON.stringify(list))

    if (update.status === 201) {
      setUpdateList(updateList + 1)
    } else {
      setServerError(true)
    }
  }

  const toggleSave = async (id: number, amountOfSaved: number) => {
    if (savedArticles.includes(id)) {
      const edit = await editSavedTimes(id, "remove", amountOfSaved)
      if (edit.status !== 201) {
        setServerError(true)
      }
      const index = savedArticles.indexOf(id)

      const newArrayOfSavedArticles = savedArticles
      newArrayOfSavedArticles.splice(index, 1)

      await updateSavedArticlesList(newArrayOfSavedArticles)
    } else {
      const edit = await editSavedTimes(id, "add", amountOfSaved)
      if (edit.status !== 201) {
        setServerError(true)
      }

      const newArrayOfSavedArticles = savedArticles
      newArrayOfSavedArticles.push(id)

      await updateSavedArticlesList(newArrayOfSavedArticles)
    }
  }

  const handleSavedArticles = async () => {
    if (userData.type === "client") {
      const getSavedArticlesCall = await getSavedArticles(userData.id)

      if (getSavedArticlesCall.status === 200) {
        setSavedArticles(
          getSavedArticlesCall.data !== "" &&
            getSavedArticlesCall.data !== "undefined"
            ? JSON.parse(getSavedArticlesCall.data)
            : [],
        )
      } else {
        setServerError(false)
      }
    }
  }

  useEffect(() => {
    handleSavedArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <InternalServerError
        visible={serverError}
        changeVisibility={() => setServerError(false)}
      />
      {articleId === undefined ? (
        <ArticlesContainer>
          {articles.length ? (
            articles.map(article => (
              <ArticleView
                key={article.id}
                region={JSON.parse(article.regionFilters as string)[0]}
                article={article}
                saved={savedArticles.includes(article.id)}
                toggleSave={() => {
                  if (userData.type === "client") {
                    toggleSave(article.id, article.saved)
                  }
                }}
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
            <a href={`${process.env.NEXT_PUBLIC_FRONT_URL}/dashboard`}>
              Articulos
            </a>
            <BsChevronRight />
            <span>{router.query.title}</span>
          </Chip>
          <ArticleBody showImageVisualizer queries />
        </FullArticle>
      )}
      {articleId === undefined && articles.length >= 25 && (
        <ButtonContainer>
          <Button
            content="Cargar mas articulos"
            cta
            action={() => {
              setCurrentPage(currentPage + 1)
            }}
          />
        </ButtonContainer>
      )}
    </>
  )
}

export default DashboardView
