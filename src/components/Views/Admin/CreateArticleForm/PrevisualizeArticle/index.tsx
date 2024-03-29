import React, { useState, useContext, useEffect } from "react"
import { Button } from "antd"
import texts from "strings/articles.json"
import { ArticlesContext } from "contexts/Articles"
import {
  AttachmentViewInterface,
  ContentType,
} from "interfaces/content/Article"
import MediaViewer from "components/UI/MediaViewer"
import ArticleView from "@components/Views/Common/Articles/ArticleCard"
import ArticleBody from "@components/Views/Common/Articles/ArticleBody"
import {
  Container,
  ButtonContainer,
  Content,
  Previewer,
  PreviewContent,
} from "./styles"

function PrevisualizeArticle() {
  const {
    newArticle,
    attachmentsForServer,
    attachmentsForDataBase,
    imageSelectedForPortrait,
  } = useContext(ArticlesContext)
  const [contentToShow, setContentToShow] = useState<ContentType>("card")

  const [portrait, setPortrait] = useState<{ image: string }>({ image: "" })

  const [docs, setDocs] = useState<any>([])

  const reader = new FileReader()

  const defineFileNamesForVisualizer = (): AttachmentViewInterface[] => {
    const newArray = []
    for (let i = 0; i < attachmentsForDataBase.length; i += 1) {
      newArray.push({
        uri: docs[i]?.uri,
        name: attachmentsForDataBase[i].name,
        extension: attachmentsForDataBase[i].extension,
        type: attachmentsForDataBase[i].type,
      })
    }

    return newArray
  }

  // *** Setear imagen como URL para poder previsualizarla en la carta de articulo
  const setImageURL = () => {
    const image = imageSelectedForPortrait as string
    const findImage = [...attachmentsForServer].filter(
      s => s.name.split(".")[0] === image.split(".")[0],
    )

    const docsArray: any = []

    attachmentsForServer.forEach(attachment =>
      docsArray.push({ uri: URL.createObjectURL(attachment) }),
    )
    setDocs(docsArray)

    if (findImage.length) {
      setPortrait({ image: URL.createObjectURL(findImage[0]) })
      reader.readAsDataURL(findImage[0])
    }
  }

  useEffect(() => {
    if (attachmentsForServer.length) {
      setImageURL()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachmentsForServer])

  return (
    <Container>
      <ButtonContainer>
        <Button
          type={contentToShow === "card" ? "primary" : "default"}
          onClick={() => setContentToShow("card")}
        >
          {texts.newArticleForm.card}
        </Button>
        <Button
          type={contentToShow === "content" ? "primary" : "default"}
          onClick={() => setContentToShow("content")}
        >
          {texts.newArticleForm.article}
        </Button>

        <Button
          type={contentToShow === "attachments" ? "primary" : "default"}
          onClick={() => setContentToShow("attachments")}
        >
          {texts.newArticleForm.attachedFiles}
        </Button>
      </ButtonContainer>
      <Content>
        {contentToShow === "card" && (
          <ArticleView
            URLBlocked
            region={newArticle.regionFilters[0] as number}
            article={{ ...newArticle, portrait: portrait.image }}
          />
        )}
        {contentToShow === "content" && (
          <ArticleBody article={{ ...newArticle }} />
        )}
        {contentToShow === "attachments" && (
          <Previewer>
            <PreviewContent>
              {attachmentsForServer.length > 0 && (
                <MediaViewer uri={defineFileNamesForVisualizer()} />
              )}
            </PreviewContent>
          </Previewer>
        )}
      </Content>
    </Container>
  )
}

export default PrevisualizeArticle
