import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getArticleById } from "services/articles/articles.service"
import ArticleInterface from "interfaces/content/Article"
import texts from "strings/articles.json"
import Scroll from "components/UI/Scroll"
import Icon from "components/UI/Assets/Icon"
import MediaViewer from "components/UI/MediaViewer"
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

type ConditionalProps =
  | {
      queries?: boolean
      article?: never
    }
  | {
      queries?: never
      article?: ArticleInterface
    }

interface CommonProps {
  showImageVisualizer?: boolean
}

type Props = CommonProps & ConditionalProps

function ArticleBody(props: Props) {
  const { article, showImageVisualizer, queries } = props

  const router = useRouter()

  const [data, setData] = useState<ArticleInterface>()

  const [articleParagraphs, setArticleParagraphs] = useState<string[]>([])

  const cleanArticle = (fullArticle: string) => {
    const text = fullArticle.split("\n")
    setArticleParagraphs(text)
  }

  const getArticleData = async () => {
    const getArticleByIdReq = await getArticleById(
      parseInt(router.query.articleId as string, 10),
    )
    setData(getArticleByIdReq.data[0])
    cleanArticle(getArticleByIdReq.data[0].article)
  }

  useEffect(() => {
    if (!queries && typeof article !== "undefined") {
      setData(article)
      cleanArticle(article.article)
    } else {
      getArticleData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      {data !== undefined && (
        <LeftContainer>
          <div className="articleHeader">
            <ArticleRegion>
              {typeof data.regionFilters === "string"
                ? JSON.parse(data.regionFilters as string)[0].value
                : data.regionFilters[0].value}
            </ArticleRegion>
            <ArticleTitle>{data.title}</ArticleTitle>
            <Subtitle>{data.subtitle}</Subtitle>
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
                {data.author}
              </p>
            </AuthorContainer>
          </ArticleContainer>
        </LeftContainer>
      )}
      {showImageVisualizer && data !== undefined && (
        <RigthContainer>
          {(typeof data.attachments === "string"
            ? JSON.parse(data.attachments as string).length
            : data.attachments.length) && (
            <MediaViewer
              urls={
                typeof data.attachments === "string"
                  ? JSON.parse(data.attachments as string)
                  : data.attachments
              }
            />
          )}
        </RigthContainer>
      )}
    </Container>
  )
}

export default ArticleBody
