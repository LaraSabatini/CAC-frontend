/* eslint-disable no-console */
import React, { useState, useContext } from "react"
import { ArticlesContext } from "contexts/Articles"
import texts from "strings/articles.json"
import ModalStatus from "components/UI/ModalStatus"
import Button from "components/UI/Button"
import getFiles from "helpers/media/getFiles"
import { dateFormated } from "helpers/dates/getToday"
import { editArticle } from "services/articles/articles.service"
import { uploadFile } from "services/articles/fileManagement.service"
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

  const sendFile = async (formData: FormData) => {
    try {
      const uploadFileReq = await uploadFile(formData)
      return uploadFileReq
    } catch (ex) {
      return {
        error: ex,
      }
    }
  }

  const saveFile = (index: number) => {
    return {
      file: newAttachmentsForServer[index],
      name: `${newAttachmentsForServer[index].name}.${
        newAttachmentsForServer[index].type.split("/")[1]
      }`,
    }
  }

  const publishArticle = async () => {
    let success: boolean = false

    if (portrait !== null) {
      const userData = JSON.parse(localStorage.getItem("userData") as string)

      const data = {
        ...articleEdited,
        portrait: getFiles(portrait.split(".")[0], portrait.split(".")[1]),
        attachments: JSON.stringify(newAttachmentsForDataBase),
        regionFilters: JSON.stringify(articleEdited.regionFilters),
        themeFilters: JSON.stringify(articleEdited.themeFilters),
        createdBy: JSON.stringify(articleEdited.createdBy),
        changesHistory: JSON.stringify([
          ...articleEdited.changesHistory,
          {
            date: dateFormated,
            changedBy: {
              id: userData.id,
              email: userData.email,
            },
            action: "MODIFIED",
          },
        ]),
      }

      const editArticleCall = await editArticle(data)
      console.log("editArticleCall", editArticleCall)
      success = editArticleCall.status === 201

      for (let i = 0; i < newAttachmentsForServer.length; i += 1) {
        const fileData = saveFile(i)

        const formData = new FormData()

        if (fileData !== undefined) {
          formData.append("file", fileData.file)
          formData.append("fileName", fileData.name)

          // eslint-disable-next-line no-await-in-loop
          const postFile: any = await sendFile(formData)
          success = postFile.status === 200
        }
      }
    }

    setEditedArticle(success)
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
