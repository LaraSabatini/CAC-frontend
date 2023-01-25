import React, { useEffect, useState } from "react"
import ArticleInterface from "interfaces/content/Article"
import texts from "strings/articles.json"
import Scroll from "components/UI/Scroll"
import Icon from "components/UI/Assets/Icon"
import {
  Container,
  LeftContainer,
  ArticleTitle,
  ArticleRegion,
  Subtitle,
  ArticleContainer,
  ArticleParagraph,
  AuthorContainer,
  RigthContainer,
} from "./styles"

interface ArticleBodyInterface {
  article: ArticleInterface
  showImageVisualizer?: boolean
}

function ArticleBody({ article, showImageVisualizer }: ArticleBodyInterface) {
  const [articleParagraphs, setArticleParagraphs] = useState<string[]>([])

  const cleanArticle = () => {
    const text = article.article.split("\n")
    setArticleParagraphs(text)
  }

  useEffect(() => {
    cleanArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <LeftContainer>
        <div className="articleHeader">
          <ArticleRegion>{article.regionFilters[0]?.value}</ArticleRegion>
          <ArticleTitle>{article.title}</ArticleTitle>
          <Subtitle>{article.subtitle}</Subtitle>
        </div>
        <ArticleContainer>
          <Scroll height={340}>
            {articleParagraphs.map((paragraph: string) => (
              <ArticleParagraph>{paragraph}</ArticleParagraph>
            ))}
          </Scroll>
          <AuthorContainer>
            <Icon icon="Profile" />
            <p>
              <span>{texts.author}</span>
              {article.author}
            </p>
          </AuthorContainer>
        </ArticleContainer>
      </LeftContainer>
      {showImageVisualizer && <RigthContainer />}
    </Container>
  )
}

export default ArticleBody
