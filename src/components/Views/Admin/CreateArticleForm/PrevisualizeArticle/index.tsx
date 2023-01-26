import React, { useState, useContext, useEffect } from "react"
import Button from "components/UI/Button"
import texts from "strings/articles.json"
import { DashboardContext } from "contexts/Dashboard"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import ArticleView from "components/Views/Articles/ArticleCard"
import ArticleBody from "components/Views/Articles/ArticleBody"
import {
  Container,
  ButtonContainer,
  Content,
  Previewer,
  ArrowContainer,
  PreviewContent,
} from "./styles"

function PrevisualizeArticle() {
  const {
    newArticle,
    attachmentsForServer,
    attachmentsForDataBase,
  } = useContext(DashboardContext)
  const [contentToShow, setContentToShow] = useState<
    "card" | "content" | "attachments"
  >("card")

  const [portrait, setPortrait] = useState<{ image: string }>({ image: "" })

  const [docs, setDocs] = useState<any>([])
  const [currentFile, setCurrentFile] = useState<number>(0)

  const reader = new FileReader()

  // *** Setear imagen como URL para poder previsualizarla en la carta de articulo
  const setImageURL = () => {
    const getImage = attachmentsForServer.filter(
      image => image.type.split("/")[0] === "image",
    )

    const docsArray: any = []
    for (let i = 0; i < attachmentsForServer.length; i += 1) {
      docsArray.push({ uri: URL.createObjectURL(attachmentsForServer[i]) })
    }
    setDocs(docsArray)

    if (getImage.length) {
      setPortrait({ image: URL.createObjectURL(getImage[0]) })
      reader.readAsDataURL(getImage[0])
    }
  }

  const goNext = () => {
    if (currentFile + 1 < attachmentsForServer.length) {
      setCurrentFile(currentFile + 1)
    } else {
      setCurrentFile(0)
    }
  }
  const goPrev = () => {
    if (currentFile - 1 > 0) {
      setCurrentFile(currentFile - 1)
    } else {
      setCurrentFile(attachmentsForServer.length - 1)
    }
  }

  useEffect(() => {
    if (attachmentsForServer.length) {
      setImageURL()
      setCurrentFile(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachmentsForServer])

  console.log(currentFile)

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
          <ArticleBody article={{ ...newArticle, author: "Flor Voglino" }} />
        )}
        {contentToShow === "attachments" && (
          <Previewer>
            {attachmentsForServer.length > 0 && (
              <PreviewContent>
                <ArrowContainer>
                  <button type="button" onClick={goPrev}>
                    <BsChevronLeft />
                  </button>
                  <button type="button" onClick={goNext}>
                    <BsChevronRight />
                  </button>
                </ArrowContainer>
                {attachmentsForDataBase[currentFile].type !== "image" ? (
                  <object
                    data={docs[currentFile].uri}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  >
                    <p>
                      Acceder a<a href={docs[currentFile].uri}>archivo</a>
                    </p>
                  </object>
                ) : (
                  <img
                    alt={attachmentsForDataBase[currentFile].name}
                    src={docs[currentFile].uri}
                  />
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
