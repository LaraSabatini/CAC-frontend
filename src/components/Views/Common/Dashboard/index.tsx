import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import {
  getSavedArticles,
  editSavedArticles,
} from "services/clients/clientActions.service"
import { BsChevronRight } from "react-icons/bs"
import {
  getArticles,
  editSavedTimes,
  getDrafts,
} from "services/articles/articles.service"
import { DashboardContext } from "contexts/Dashboard"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import { getFilters } from "services/articles/filters.service"
import Header from "@components/Views/Common/Header"
import { Button } from "antd"
import removeDuplicates from "helpers/formatting/removeDuplicates"
import {
  FullArticle,
  ArticlesContainer,
  Chip,
  EmptyPage,
  ButtonContainer,
  CardPlaceholder,
  AdminButton,
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

  const [loading, setLoading] = useState<boolean>(false)

  const [drafts, setDrafts] = useState<boolean>(false)

  const [savedArticles, setSavedArticles] = useState<number[]>([])
  const [updateList, setUpdateList] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const getFiltersData = async () => {
    setLoading(true)

    const getFiltersThemes = await getFilters()
    if (getFiltersThemes.status === 200) {
      setThemeFilters(getFiltersThemes.data)
    } else {
      setServerError(true)
    }

    const getArticlesReq = await getArticles(currentPage)
    if (getArticlesReq.status === 200) {
      setArticles(getArticlesReq.data)
      setLoading(false)

      if (articles.length > 0) {
        const filterDrafts = articles.filter(article => article.draft !== 1)
        const newList = removeDuplicates(
          filterDrafts.concat(getArticlesReq.data),
        )

        setArticles(newList)
      } else {
        setArticles(getArticlesReq.data)
      }
    } else {
      setServerError(true)
    }
  }

  const getArticleDrafts = async () => {
    const req = await getDrafts()
    setArticles(req.data)
  }

  useEffect(() => {
    if (drafts) {
      getArticleDrafts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerArticleListUpdate, drafts])

  useEffect(() => {
    if (!drafts) {
      getFiltersData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerArticleListUpdate, currentPage, drafts])

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
      {loading && !articles.length && (
        <ArticlesContainer>
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
        </ArticlesContainer>
      )}
      {userData.type !== "client" && router.query.articleId === undefined ? (
        <AdminButton>
          <Button onClick={() => setDrafts(!drafts)}>
            {!drafts ? "Ver artículos borradores" : "Ver artículos publicados"}
          </Button>
        </AdminButton>
      ) : (
        <></>
      )}
      {articleId === undefined ? (
        <ArticlesContainer>
          {articles.length ? (
            articles
              .filter(article => article !== undefined)
              .map(article => (
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
            <></>
          )}
          {!articles.length && !loading ? (
            <EmptyPage>No hay artículos para mostrar</EmptyPage>
          ) : (
            <></>
          )}
        </ArticlesContainer>
      ) : (
        <FullArticle>
          <Chip>
            <a href={`${process.env.NEXT_PUBLIC_FRONT_URL}/dashboard`}>
              Artículos
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
            type="primary"
            onClick={() => {
              setCurrentPage(currentPage + 1)
            }}
          >
            Cargar mas artículos
          </Button>
        </ButtonContainer>
      )}
    </>
  )
}

export default DashboardView
