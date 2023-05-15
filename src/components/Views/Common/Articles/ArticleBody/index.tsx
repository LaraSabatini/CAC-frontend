import React, { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import { ArticlesContext } from "contexts/Articles"
import {
  getArticleById,
  deleteArticle,
} from "services/articles/articles.service"
import { getProfilePic } from "services/admins/profilePic.service"
import ArticleInterface, {
  CreatedByInterface,
} from "interfaces/content/Article"
import { Modal, Button, Tooltip } from "antd"
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons"
import { ImLocation } from "react-icons/im"
import { FaCalendarMinus } from "react-icons/fa"
import { BsDot } from "react-icons/bs"
import regionFilters from "const/regions"
import texts from "strings/articles.json"
import Icon from "components/UI/Assets/Icon"
import MediaViewer from "components/UI/MediaViewer"
import { dateFormated } from "helpers/dates/getToday"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
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
  Buttons,
  ProfilePicContainer,
  ArticleContent,
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

  const [profilePic, setProfilePic] = useState<string>("")

  const { confirm } = Modal

  const { setArticleSelected, discardArticleEdition } = useContext(
    ArticlesContext,
  )
  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const [inModal, setInModal] = useState<boolean>(false)

  const router = useRouter()
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [data, setData] = useState<ArticleInterface>()

  const [refresh, setRefresh] = useState<number>(0)

  const [articleParagraphs, setArticleParagraphs] = useState<string[]>([])

  const [modalEdit, setModalEdit] = useState<boolean>(false)

  const [changesHistory, setChangesHistory] = useState<
    {
      date: string
      changedBy: CreatedByInterface
      action: "CREATED" | "MODIFIED"
    }[]
  >()

  const urlify = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.replace(urlRegex, url => {
      return `<a href="${url}">${url}</a>`
    })
  }

  const cleanArticle = (fullArticle: string) => {
    const text = fullArticle.split("\n")
    const list: string[] = []
    text.forEach(txt => list.push(`<p>${urlify(txt)}</p>`))
    setArticleParagraphs(list)
  }

  const getArticleData = async () => {
    const getArticleByIdReq = await getArticleById(
      parseInt(router.query.articleId as string, 10),
    )
    if (getArticleByIdReq.status === 200) {
      setData(getArticleByIdReq.data[0])
      cleanArticle(getArticleByIdReq.data[0].article)

      setChangesHistory(
        JSON.parse(getArticleByIdReq.data[0].changesHistory as string),
      )

      const getAdminPic = await getProfilePic(
        0,
        getArticleByIdReq.data[0].author,
      )

      if (
        getAdminPic.data.length > 0 &&
        getAdminPic.data[0].profilePic !== ""
      ) {
        setProfilePic(getAdminPic.data[0].profilePic)
      }
    } else {
      setServerErrorModal(true)
    }
  }

  useEffect(() => {
    if (!queries && typeof article !== "undefined") {
      setData(article)
      cleanArticle(article.article)
      setInModal(true)
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

  const success = () => {
    Modal.success({
      content: "Acción realizada con éxito",
      onOk() {
        router.replace("/dashboard").then(() => {
          router.reload()
        })
      },
    })
  }

  const deleteArticleAction = async () => {
    const deleteArticleReq = await deleteArticle(
      parseInt(router.query.articleId as string, 10),
    )

    if (deleteArticleReq.status === 200) {
      success()
    } else {
      setServerErrorModal(true)
    }
  }

  const showDelete = () => {
    confirm({
      title: "¿Estás seguro de que deseas eliminar el artículo?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteArticleAction()
      },
      okText: "Eliminar",
      cancelText: "Cancelar",
    })
  }

  return (
    <div>
      <Container inModal={inModal}>
        <InternalServerError
          visible={serverErrorModal}
          changeVisibility={() => setServerErrorModal(false)}
        />
        {data !== undefined && (
          <LeftContainer>
            {modalEdit && (
              <EditArticleForm
                closeForm={() => {
                  setModalEdit(false)
                  setInModal(false)
                  discardArticleEdition()
                  delete router.query.edition
                  router.push(router)
                  setRefresh(refresh + 1)
                }}
              />
            )}

            <div className="articleHeader">
              <ArticleRegion>
                <p>
                  <ImLocation />
                  {typeof data.regionFilters === "string"
                    ? regionFilters.filter(
                        item =>
                          item.id ===
                          JSON.parse(data.regionFilters as string)[0],
                      )[0]?.value
                    : regionFilters.filter(
                        item => item.id === data.regionFilters[0],
                      )[0].value}
                </p>
                <BsDot />
                <p>
                  <FaCalendarMinus />
                  {changesHistory !== undefined ? (
                    <>
                      {changesHistory[
                        changesHistory.length - 1
                      ].date?.replaceAll("-", "/")}
                    </>
                  ) : (
                    dateFormated.replaceAll("-", "/")
                  )}
                </p>
              </ArticleRegion>
              <ArticleTitle>{data.title}</ArticleTitle>
              <Subtitle>{data.subtitle}</Subtitle>

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
              <AuthorContainer>
                {profilePic !== "" ? (
                  <ProfilePicContainer bg={profilePic} />
                ) : (
                  <Icon icon="Profile" />
                )}
                <p>
                  <span>{texts.author}</span>
                  {data.author}
                </p>
                {typeof queries !== "undefined" && userData.type === "admin" && (
                  <Buttons>
                    <Tooltip title="Editar">
                      <Button
                        type="primary"
                        onClick={() => {
                          setArticleSelected(data)
                          setModalEdit(true)
                          setInModal(true)
                          router.query.edition = "true"
                          router.push(router)
                        }}
                        icon={<EditOutlined />}
                      />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <Button
                        danger
                        type="primary"
                        onClick={showDelete}
                        icon={<DeleteOutlined />}
                      />
                    </Tooltip>
                  </Buttons>
                )}
              </AuthorContainer>
            </div>
            <ArticleContainer>
              <ArticleContent>
                {articleParagraphs.map((paragraph: string) => (
                  <ArticleParagraph
                    key={Math.floor(Math.random() * 1000)}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </ArticleContent>
            </ArticleContainer>
          </LeftContainer>
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
