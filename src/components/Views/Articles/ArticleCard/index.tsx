import React, { useContext } from "react"
import { useRouter } from "next/router"
import { DashboardContext } from "contexts/Dashboard"
import texts from "strings/dashboard.json"
import routes from "routes"
import ArticleInterface from "interfaces/content/Article"
import {
  ArticleCard,
  ArticleTitle,
  ArticleRegion,
  CardInfo,
  CardImageContainer,
  ArticleDescription,
  OpenButton,
} from "./styles"

interface ArticleViewInterface {
  article: ArticleInterface
  URLBlocked?: boolean
}

function ArticleView({ article, URLBlocked }: ArticleViewInterface) {
  const router = useRouter()

  const { regionFilters } = useContext(DashboardContext)

  return (
    <ArticleCard>
      <CardInfo>
        <div className="articleHeader">
          <ArticleRegion>
            {
              regionFilters.filter(
                item =>
                  item.id === JSON.parse(article.regionFilters as string)[0],
              )[0].value
            }
          </ArticleRegion>
          <ArticleTitle>{article.title}</ArticleTitle>
        </div>

        <ArticleDescription>{article.description}</ArticleDescription>

        <OpenButton
          onClick={() => {
            if (!URLBlocked) {
              router.replace(
                `${routes.dashboard.name}?${routes.dashboard.queries.article}${article.id}&title=${article.title}`,
              )
            }
          }}
        >
          {texts.readArticle}
        </OpenButton>
      </CardInfo>
      <CardImageContainer>
        <img src={article.portrait} alt="article portrait" />
      </CardImageContainer>
    </ArticleCard>
  )
}

export default ArticleView
