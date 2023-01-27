import React, { useState, useContext, useEffect } from "react"
import Button from "components/UI/Button"
import texts from "strings/articles.json"
import { DashboardContext } from "contexts/Dashboard"
import { ExtensionType } from "interfaces/content/Article"
import MediaViewer from "components/UI/MediaViewer"
import ArticleView from "components/Views/Articles/ArticleCard"
import ArticleBody from "components/Views/Articles/ArticleBody"
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
  } = useContext(DashboardContext)
  const [contentToShow, setContentToShow] = useState<
    "card" | "content" | "attachments"
  >("card")

  const [portrait, setPortrait] = useState<{ image: string }>({ image: "" })

  const [docs, setDocs] = useState<any>([])

  const reader = new FileReader()

  const defineFileNamesForVisualizer = (): {
    uri: string
    name: string
    extension: string
    type: ExtensionType
  }[] => {
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
    for (let i = 0; i < attachmentsForServer.length; i += 1) {
      docsArray.push({ uri: URL.createObjectURL(attachmentsForServer[i]) })
    }
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
          content={texts.newArticleForm.card}
          cta={contentToShow === "card"}
          action={() => setContentToShow("card")}
        />
        <Button
          content={texts.newArticleForm.article}
          cta={contentToShow === "content"}
          action={() => setContentToShow("content")}
        />
        <Button
          content={texts.newArticleForm.attachedFiles}
          cta={contentToShow === "attachments"}
          action={() => setContentToShow("attachments")}
        />
      </ButtonContainer>
      <Content>
        {contentToShow === "card" && (
          <ArticleView
            URLBlocked
            article={{ ...newArticle, portrait: portrait.image }}
          />
        )}
        {contentToShow === "content" && (
          <ArticleBody article={{ ...newArticle }} />
        )}
        {contentToShow === "attachments" && (
          <Previewer>
            {attachmentsForServer.length > 0 && (
              <PreviewContent>
                {attachmentsForServer.length && (
                  <MediaViewer uri={defineFileNamesForVisualizer()} />
                )}
              </PreviewContent>
            )}
          </Previewer>
        )}
      </Content>
    </Container>
  )
}

export default PrevisualizeArticle
