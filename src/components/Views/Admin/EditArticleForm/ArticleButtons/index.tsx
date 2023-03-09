/* eslint-disable no-console */
import React, { useState, useContext } from "react"
import { ArticlesContext } from "contexts/Articles"
import texts from "strings/articles.json"
import ModalStatus from "components/UI/ModalStatus"
import Button from "components/UI/Button"
import { ActionButtons, WarningMessage } from "../../CreateArticleForm/styles"

interface ArticleButtonsFormInterface {
  closeForm: (arg?: any) => void
  updateList: (arg?: any) => void
}

function ArticleButtons({
  closeForm,
  updateList,
}: ArticleButtonsFormInterface) {
  const {
    previsualizeEdit,
    setPrevisualizeEdit,
    articleEdited,
    newAttachmentsForDataBase,
    newAttachmentsForServer,
    portrait,
  } = useContext(ArticlesContext)

  const [warningMessage, setWarningMessage] = useState<string>("")
  const [editedArticle, setEditedArticle] = useState<boolean>(false)

  const canPreview =
    articleEdited.title !== "" &&
    articleEdited.description !== "" &&
    articleEdited.subtitle !== "" &&
    articleEdited.regionFilters.length &&
    articleEdited.article !== "" &&
    articleEdited.author !== "" &&
    portrait !== null

  const publishArticle = () => {
    console.log("publishArticle")
    setEditedArticle(true)
    console.log("articleEdited", articleEdited)
    console.log("newAttachmentsForDataBase", newAttachmentsForDataBase)
    console.log("newAttachmentsForServer", newAttachmentsForServer)
  }

  return (
    <ActionButtons>
      {editedArticle && (
        <ModalStatus
          title={texts.newArticleForm.success.title}
          description={texts.newArticleForm.success.description}
          status="success"
          selfClose
          selfCloseAction={updateList}
        />
      )}
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
          !previsualizeEdit
            ? `${texts.newArticleForm.visualize}`
            : `${texts.newArticleForm.edit}`
        }
        cta={false}
        action={() => {
          if (canPreview) {
            setPrevisualizeEdit(!previsualizeEdit)
            setWarningMessage("")
          } else {
            setWarningMessage(texts.newArticleForm.requiredMessage)
          }
        }}
      />
      <Button
        content={texts.newArticleForm.publish}
        cta
        action={() => {
          if (canPreview) {
            publishArticle()
            setWarningMessage("")
          } else {
            setWarningMessage(texts.newArticleForm.requiredMessage)
          }
        }}
      />
    </ActionButtons>
  )
}

export default ArticleButtons
