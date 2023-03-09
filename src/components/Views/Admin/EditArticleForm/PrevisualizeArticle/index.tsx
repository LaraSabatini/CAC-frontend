import React, { useState, useContext, useEffect } from "react"
import Button from "components/UI/Button"
import texts from "strings/articles.json"
import { ArticlesContext } from "contexts/Articles"
import { ContentType } from "interfaces/content/Article"
import DataPrevisualizerInterface from "interfaces/components/DataPrevisualizerInterface"
import MediaViewer from "components/UI/MediaViewer"
import ArticleView from "components/Views/Articles/ArticleCard"
import ArticleBody from "components/Views/Articles/ArticleBody"
import getFiles from "helpers/media/getFiles"
import { getFile } from "services/articles/fileManagement.service"
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

  const reader = new FileReader()

  const [cardPortrait, setCardPortrait] = useState<any>()

  const [filesToPreview, setFilesToPreview] = useState<
    DataPrevisualizerInterface[]
  >()

  const originalDocs = JSON.parse(articleSelected?.attachments as string)

  console.log(newAttachmentsForDataBase)

  const getURLsForPreview = async () => {
    const fileArray: any[] = []
    const newFiles: any[] = []

    const attachmentsToTransform = newAttachmentsForDataBase.filter(
      item => item.type !== "video",
    )

    const attachedVideos = newAttachmentsForDataBase.filter(
      item => item.type === "video",
    )

    for (let i = 0; i < attachmentsToTransform.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const findFile: any = await getFile(
        attachmentsToTransform[i].name,
        attachmentsToTransform[i].extension,
      )
      if (findFile.data !== undefined) {
        fileArray.push(attachmentsToTransform[i])
      } else {
        newFiles.push(attachmentsToTransform[i])
      }
    }

    const filesToPreviewArray: DataPrevisualizerInterface[] = []

    for (let i = 0; i < fileArray.length; i += 1) {
      const URL = getFiles(fileArray[i].name, fileArray[i].extension)

      filesToPreviewArray.push({
        uri: URL,
        name: fileArray[i].name,
        extension: fileArray[i].extension,
        type: fileArray[i].type,
      })
    }

    for (let i = 0; i < newFiles.length; i += 1) {
      filesToPreviewArray.push({
        uri: URL.createObjectURL(newAttachmentsForServer[i]),
        name: newFiles[i].name,
        extension: newFiles[i].extension,
        type: newFiles[i].type,
      })
    }

    setFilesToPreview(filesToPreviewArray.concat(attachedVideos[0]))
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
    // setDocs(docsArray)

    if (findImage.length) {
      setCardPortrait(URL.createObjectURL(findImage[0]))
      reader.readAsDataURL(findImage[0])
    } else {
      setCardPortrait(portrait)
    }
  }

  useEffect(() => {
    setImageURL()
    getURLsForPreview()
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
                <MediaViewer uri={filesToPreview} />
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
