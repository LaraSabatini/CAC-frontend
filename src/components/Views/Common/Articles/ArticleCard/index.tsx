import React, { useState } from "react"
import { useRouter } from "next/router"
import texts from "strings/dashboard.json"
import { ImLocation } from "react-icons/im"
import { BsDot, BsBookmark, BsFillBookmarkFill } from "react-icons/bs"
import { FaCalendarMinus, FaEye } from "react-icons/fa"
import routes from "routes"
import { Tooltip } from "antd"
import ArticleInterface from "interfaces/content/Article"
import regionFilters from "const/regions"
import { dateFormated } from "helpers/dates/getToday"
import {
  ArticleCard,
  ArticleTitle,
  ArticleRegion,
  CardInfo,
  CardImageContainer,
  ArticleDescription,
  OpenButton,
  ButtonContainer,
} from "./styles"

interface ArticleViewInterface {
  article: ArticleInterface
  region: number
  URLBlocked?: boolean
  saved?: boolean
  toggleSave?: (arg?: any) => void
  savedTimes?: number
}

function ArticleView({
  article,
  URLBlocked,
  region,
  saved,
  toggleSave,
  savedTimes,
}: ArticleViewInterface) {
  const router = useRouter()

  const changesHistory =
    typeof article.changesHistory !== "string"
      ? article.changesHistory.length === 0
        ? dateFormated
        : article.changesHistory
      : JSON.parse(article.changesHistory as string)
  const [amountOfSavedTimes, setAmountOfSavedTimes] = useState(savedTimes)

  return (
    <ArticleCard>
      <CardInfo>
        <div className="articleHeader">
          <ArticleRegion>
            <ImLocation />
            {regionFilters.filter(item => item.id === region)[0]?.value}
            <BsDot />
            <FaCalendarMinus />
            {article.id === 0 && changesHistory !== undefined
              ? changesHistory.replaceAll("-", "/")
              : changesHistory[changesHistory.length - 1].date.replaceAll(
                  "-",
                  "/",
                )}
          </ArticleRegion>
          <ArticleTitle>{article.title}</ArticleTitle>
        </div>
        <ArticleDescription>{article.description}</ArticleDescription>
        <ButtonContainer>
          <Tooltip
            title={`Artículo guardado por ${amountOfSavedTimes} usuario/s`}
          >
            <div className="saved-times">
              <BsFillBookmarkFill />{" "}
              {amountOfSavedTimes !== undefined ? amountOfSavedTimes : 0}
            </div>
          </Tooltip>
          <div className="buttons">
            <OpenButton
              onClick={() => {
                if (!URLBlocked) {
                  router.replace(
                    `${routes.dashboard.name}?${routes.dashboard.queries.article}${article.id}&title=${article.title}`,
                  )
                }
              }}
            >
              <Tooltip title={texts.readArticle}>
                <FaEye />
              </Tooltip>
            </OpenButton>
            {saved !== undefined &&
              amountOfSavedTimes !== undefined &&
              toggleSave !== undefined && (
                <OpenButton
                  onClick={() => {
                    if (toggleSave !== undefined) {
                      toggleSave()
                    }
                    setAmountOfSavedTimes(
                      saved ? amountOfSavedTimes - 1 : amountOfSavedTimes + 1,
                    )
                  }}
                >
                  <Tooltip
                    title={!saved ? texts.saveArticle : texts.removeArticle}
                  >
                    {saved ? <BsFillBookmarkFill /> : <BsBookmark />}
                  </Tooltip>
                </OpenButton>
              )}
          </div>
        </ButtonContainer>
      </CardInfo>
      <CardImageContainer
        onClick={() => {
          if (!URLBlocked) {
            router.replace(
              `${routes.dashboard.name}?${routes.dashboard.queries.article}${article.id}&title=${article.title}`,
            )
          }
        }}
      >
        <img src={article.portrait} alt="article portrait" />
      </CardImageContainer>
    </ArticleCard>
  )
}

export default ArticleView
