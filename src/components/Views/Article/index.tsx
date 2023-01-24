import React from "react"
import { useRouter } from "next/router"
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
}

function ArticleView({ article }: ArticleViewInterface) {
  const router = useRouter()

  return (
    <ArticleCard>
      <CardInfo>
        <div className="articleHeader">
          <ArticleRegion>{article.regionTitle}</ArticleRegion>
          <ArticleTitle>{article.title}</ArticleTitle>
        </div>

        <ArticleDescription>{article.description}</ArticleDescription>

        <OpenButton
          onClick={() =>
            router.replace(
              `${routes.articles.name}?${routes.articles.queries.id}${article.id}`,
            )
          }
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
