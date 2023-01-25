import React, { useContext, useState } from "react"
import { DashboardContext } from "contexts/Dashboard"
import texts from "strings/articles.json"
import Button from "components/UI/Button"
import { ActionButtons, WarningMessage } from "../styles"

interface ArticleButtonsFormInterface {
  closeForm: (arg?: any) => void
}

function ArticleButtons({ closeForm }: ArticleButtonsFormInterface) {
  const {
    previsualize,
    setPrevisualize,
    newArticle,
    attachmentsForDataBase,
  } = useContext(DashboardContext)

  const [warningMessage, setWarningMessage] = useState<string>("")

  const findPortrait = attachmentsForDataBase.filter(
    file => file.type === "image",
  )

  const canPreview =
    newArticle.title !== "" &&
    newArticle.description !== "" &&
    newArticle.subtitle !== "" &&
    newArticle.regionFilters.length &&
    newArticle.article !== "" &&
    findPortrait.length > 0

  const canPublish = false

  const publishArticle = () => {}

  return (
    <ActionButtons>
      {warningMessage !== "" && (
        <WarningMessage>{warningMessage}</WarningMessage>
      )}
      <Button
        content={texts.newArticleForm.discard}
        cta={false}
        action={closeForm}
      />
      <Button
        content={
          !previsualize
            ? `${texts.newArticleForm.visualize}`
            : `${texts.newArticleForm.edit}`
        }
        cta={false}
        action={() => {
          if (canPreview) {
            setPrevisualize(!previsualize)
            setWarningMessage("")
          } else {
            setWarningMessage(
              "Completa todos los campos obligatorios y agregar una portada.",
            )
          }
        }}
      />
      <Button
        content={texts.newArticleForm.publish}
        cta
        action={() => {
          if (canPublish) {
            publishArticle()
            setWarningMessage("")
          } else {
            setWarningMessage(
              "Completa todos los campos obligatorios y agregar una portada.",
            )
          }
        }}
      />
    </ActionButtons>
  )
}

export default ArticleButtons
