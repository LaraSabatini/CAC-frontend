import React, { useState, useContext, useEffect } from "react"
import Button from "components/UI/Button"
import texts from "strings/articles.json"
import { DashboardContext } from "contexts/Dashboard"
import ArticleView from "@components/Views/Articles/ArticleCard"
import { Container, ButtonContainer, Content } from "./styles"

function PrevisualizeArticle() {
  const { newArticle, attachmentsForServer } = useContext(DashboardContext)
  const [contentToShow, setContentToShow] = useState<"card" | "content">("card")

  const [portrait, setPortrait] = useState<{ image: string }>({ image: "" })

  // *** Setear imagen como URL para poder previsualizarla en la carta de articulo
  const setImageURL = () => {
    const getImage = attachmentsForServer.filter(
      image => image.type.split("/")[0] === "image",
    )

    if (getImage.length) {
      const reader = new FileReader()
      reader.onload = () => {
        setPortrait({ image: URL.createObjectURL(getImage[0]) })
      }
      reader.readAsDataURL(getImage[0])
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
      </ButtonContainer>
      <Content>
        <ArticleView
          URLBlocked
          article={{ ...newArticle, portrait: portrait.image }}
        />
      </Content>
    </Container>
  )
}

export default PrevisualizeArticle
