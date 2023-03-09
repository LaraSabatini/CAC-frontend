import React, { useState, useContext, useEffect } from "react"
import Button from "components/UI/Button"
import texts from "strings/articles.json"
import { ArticlesContext } from "contexts/Articles"
import {
  AttachmentViewInterface,
  ContentType,
} from "interfaces/content/Article"
import MediaViewer from "components/UI/MediaViewer"
import ArticleView from "components/Views/Articles/ArticleCard"
import ArticleBody from "components/Views/Articles/ArticleBody"
import getFiles from "helpers/media/getFiles"
import {
  Container,
  ButtonContainer,
  Content,
  Previewer,
  PreviewContent,
} from "./styles"

function PrevisualizeArticle() {
  const {
    articleEdited,
    newAttachmentsForServer,
    newAttachmentsForDataBase,
    portrait,
    articleSelected,
  } = useContext(ArticlesContext)
  const [contentToShow, setContentToShow] = useState<ContentType>("card")

  const [docs, setDocs] = useState<any>([])

  const reader = new FileReader()

  const [cardPortrait, setCardPortrait] = useState<any>()

  const originalDocs = JSON.parse(articleSelected?.attachments as string)

  const getURLsForOriginalDocs = (): AttachmentViewInterface[] => {
    const originalDocsCleaned: AttachmentViewInterface[] = []

    for (let i = 0; i < originalDocs.length; i += 1) {
      const URL = getFiles(originalDocs[i].name, originalDocs[i].extension)
      originalDocsCleaned.push({
        uri: URL,
        name: originalDocs[i].name,
        extension: originalDocs[i].extension,
        type: originalDocs[i].type,
      })
    }

    return originalDocsCleaned
  }

  const defineFileNamesForVisualizer = (): AttachmentViewInterface[] => {
    const newArray = [...getURLsForOriginalDocs()]
    for (let i = 0; i < newAttachmentsForDataBase.length; i += 1) {
      newArray.push({
        uri: docs[i]?.uri,
        name: newAttachmentsForDataBase[i].name,
        extension: newAttachmentsForDataBase[i].extension,
        type: newAttachmentsForDataBase[i].type,
      })
    }

    return newArray.filter(file => file.uri !== undefined)
  }

  // *** Setear imagen como URL para poder previsualizarla en la carta de articulo
  const setImageURL = () => {
    const image = portrait as string
    const findImage = [...newAttachmentsForServer].filter(
      s => s.name.split(".")[0] === image.split(".")[0],
    )

    const docsArray: any = []
    for (let i = 0; i < newAttachmentsForServer.length; i += 1) {
      docsArray.push({ uri: URL.createObjectURL(newAttachmentsForServer[i]) })
    }
    setDocs(docsArray)

    if (findImage.length) {
      setCardPortrait(URL.createObjectURL(findImage[0]))
      reader.readAsDataURL(findImage[0])
    } else {
      setCardPortrait(portrait)
    }
  }

  useEffect(() => {
    setImageURL()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            article={{
              ...articleEdited,
              portrait: cardPortrait,
            }}
          />
        )}

        {contentToShow === "content" && (
          <ArticleBody article={{ ...articleEdited }} />
        )}
        {contentToShow === "attachments" && (
          <Previewer>
            {newAttachmentsForServer.length || originalDocs.length ? (
              <PreviewContent>
                <MediaViewer uri={defineFileNamesForVisualizer()} />
              </PreviewContent>
            ) : (
              <></>
            )}
          </Previewer>
        )}
      </Content>
    </Container>
  )
}

export default PrevisualizeArticle
