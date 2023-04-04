import React, { useState } from "react"
import { useRouter } from "next/router"
import texts from "strings/dashboard.json"
import Tooltip from "components/UI/Tooltip"
import { ImLocation } from "react-icons/im"
import { BsDot, BsBookmark, BsFillBookmarkFill } from "react-icons/bs"
import { FaCalendarMinus, FaEye } from "react-icons/fa"
import routes from "routes"
import ArticleInterface from "interfaces/content/Article"
import regionFilters from "const/regions"
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

  const changesHistory = JSON.parse(article.changesHistory as string)

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
            {changesHistory[changesHistory.length - 1].date.replaceAll(
              "-",
              "/",
            )}
          </ArticleRegion>
          <ArticleTitle>{article.title}</ArticleTitle>
        </div>
        <ArticleDescription>{article.description}</ArticleDescription>
        <ButtonContainer>
          <Tooltip
            title={`Articulo guardado por ${amountOfSavedTimes} usuario/s`}
            placement="top-start"
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
              <Tooltip title={texts.readArticle} placement="top-end">
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
                    placement="top-end"
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
