import React, { useState, useContext, useEffect } from "react"
import { Button } from "antd"
import texts from "strings/articles.json"
import { ArticlesContext } from "contexts/Articles"
import { ContentType } from "interfaces/content/Article"
import DataPrevisualizerInterface from "interfaces/components/DataPrevisualizerInterface"
import MediaViewer from "components/UI/MediaViewer"
import ArticleView from "@components/Views/Common/Articles/ArticleCard"
import ArticleBody from "@components/Views/Common/Articles/ArticleBody"
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

  const getURLsForPreview = async () => {
    const filesInDB: any[] = []
    const newFiles: any[] = []

    const imagesAndFiles = newAttachmentsForDataBase.filter(
      item => item.type !== "video",
    )
    const attachedVideos = newAttachmentsForDataBase.filter(
      item => item.type === "video",
    )

    const filesToPreviewArray: DataPrevisualizerInterface[] = []

    // eslint-disable-next-line no-restricted-syntax
    for (const imageOfFile of imagesAndFiles) {
      //  eslint-disable-next-line no-await-in-loop
      const findFile: any = await getFile(
        imageOfFile.name,
        imageOfFile.extension,
      )

      if (findFile.data !== undefined) {
        filesInDB.push(imageOfFile)
      } else {
        newFiles.push(imageOfFile)
      }
    }

    filesInDB.forEach(fileInDB => {
      const URL = getFiles(fileInDB.name, fileInDB.extension)

      filesToPreviewArray.push({
        uri: URL,
        name: fileInDB.name,
        extension: fileInDB.extension,
        type: fileInDB.type,
      })
    })

    for (let i = 0; i < newFiles.length; i += 1) {
      filesToPreviewArray.push({
        uri: URL.createObjectURL(newAttachmentsForServer[i]),
        name: newFiles[i].name,
        extension: newFiles[i].extension,
        type: newFiles[i].type,
      })
    }

    setFilesToPreview(
      filesToPreviewArray.concat(
        attachedVideos as DataPrevisualizerInterface[],
      ),
    )
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
            region={articleEdited.regionFilters[0] as number}
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
