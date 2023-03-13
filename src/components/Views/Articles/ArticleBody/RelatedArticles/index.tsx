import React, { useEffect, useState } from "react"
import { getRelatedArticles } from "services/articles/articles.service"
import ArticleInterface from "interfaces/content/Article"
import ArticleView from "../../ArticleCard"
import { Container, Carousel, Title } from "./styles"

interface RelatedArticlesInterface {
  regionFilters: number[]
  themeFilters: number[]
}

function RelatedArticles({
  regionFilters,
  themeFilters,
}: RelatedArticlesInterface) {
  const [relatedArticles, setRelatedArticles] = useState<ArticleInterface[]>()

  const getArticles = async () => {
    const getRelatedArticlesCall = await getRelatedArticles(
      regionFilters[0],
      themeFilters[0],
    )

    if (getRelatedArticlesCall.status === 200) {
      setRelatedArticles(getRelatedArticlesCall.data)
    } else {
      setRelatedArticles([])
    }
  }

  useEffect(() => {
    getArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Title>Artículos relacionados</Title>
      <Carousel>
        {relatedArticles?.length ? (
          relatedArticles.map(article => <ArticleView article={article} />)
        ) : (
          <></>
        )}
      </Carousel>
    </Container>
  )
}

export default RelatedArticles
