import React, { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import { ArticlesContext } from "contexts/Articles"
import { getArticleById } from "services/articles/articles.service"
import ArticleInterface from "interfaces/content/Article"
import { TbPencil } from "react-icons/tb"
import { FaRegTrashAlt } from "react-icons/fa"
import regionFilters from "const/regions"
import texts from "strings/articles.json"
import Tooltip from "components/UI/Tooltip"
import Scroll from "components/UI/Scroll"
import Icon from "components/UI/Assets/Icon"
import MediaViewer from "components/UI/MediaViewer"
import DeleteArticleModal from "./DeleteArticleModal"
import EditArticleForm from "../../../Admin/EditArticleForm"
import RelatedArticles from "./RelatedArticles"
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
  RightSubcolumn,
  Buttons,
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

  const { setArticleSelected, discardArticleEdition } = useContext(
    ArticlesContext,
  )

  const router = useRouter()
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [data, setData] = useState<ArticleInterface>()

  const [refresh, setRefresh] = useState<number>(0)

  const [articleParagraphs, setArticleParagraphs] = useState<string[]>([])

  const [modalDelete, setModalDelete] = useState<boolean>(false)
  const [modalEdit, setModalEdit] = useState<boolean>(false)

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
  }, [article])

  useEffect(() => {
    if (
      router.query.articleId !== undefined &&
      router.query.edition === undefined
    ) {
      setData(undefined)
      getArticleData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.articleId, refresh])

  return (
    <div>
      <Container>
        {data !== undefined && (
          <LeftContainer>
            {modalDelete && (
              <DeleteArticleModal cancel={() => setModalDelete(false)} />
            )}
            {modalEdit && (
              <EditArticleForm
                closeForm={() => {
                  setModalEdit(false)
                  discardArticleEdition()
                  delete router.query.edition
                  router.push(router)
                  setRefresh(refresh + 1)
                }}
              />
            )}
            <div className="articleHeader">
              <ArticleRegion>
                {typeof data.regionFilters === "string" &&
                  data !== undefined &&
                  regionFilters.filter(
                    item =>
                      item.id === JSON.parse(data.regionFilters as string)[0],
                  )[0]?.value}
              </ArticleRegion>
              <ArticleTitle>{data.title}</ArticleTitle>
              <Subtitle>{data.subtitle}</Subtitle>
            </div>
            <ArticleContainer>
              <Scroll height={350}>
                {articleParagraphs.map((paragraph: string) => (
                  <ArticleParagraph key={Math.floor(Math.random() * 1000)}>
                    {paragraph}
                  </ArticleParagraph>
                ))}
              </Scroll>
              <RightSubcolumn>
                <AuthorContainer>
                  <Icon icon="Profile" />
                  <p>
                    <span>{texts.author}</span>
                    {data.author}
                  </p>
                </AuthorContainer>
                {typeof queries !== "undefined" && userData.type === "admin" && (
                  <Buttons>
                    <Tooltip title="Editar">
                      <button
                        type="button"
                        className="edit"
                        onClick={() => {
                          setArticleSelected(data)
                          setModalEdit(true)
                          router.query.edition = "true"
                          router.push(router)
                        }}
                      >
                        <TbPencil />
                      </button>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <button
                        type="button"
                        className="delete"
                        onClick={() => setModalDelete(true)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </Tooltip>
                  </Buttons>
                )}
              </RightSubcolumn>
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
      {queries && data !== undefined && (
        <RelatedArticles
          regionFilters={JSON.parse(data.regionFilters as string)}
          themeFilters={JSON.parse(data.themeFilters as string)}
        />
      )}
    </div>
  )
}

export default ArticleBody
