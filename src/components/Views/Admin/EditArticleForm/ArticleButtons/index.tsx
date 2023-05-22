import React, { useState, useContext } from "react"
import { ArticlesContext } from "contexts/Articles"
import texts from "strings/articles.json"
import { Button, Modal } from "antd"
import getFiles from "helpers/media/getFiles"
import ArticleInterface from "interfaces/content/Article"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
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
  const [serverError, setServerError] = useState<boolean>(false)

  const success = () => {
    Modal.success({
      title: "Excelente",
      content: " El artículo se ha editado correctamente.",
      onOk() {
        updateList()
      },
    })
  }

  const canPreview =
    articleEdited.title !== "" &&
    articleEdited.description !== "" &&
    articleEdited.subtitle !== "" &&
    articleEdited.regionFilters.length > 0 &&
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

  const publishArticle = async (type: "draft" | "publish") => {
    let successAction: boolean = false
    if (portrait !== null) {
      const userData = JSON.parse(localStorage.getItem("userData") as string)

      const data: ArticleInterface = {
        ...articleEdited,
        portrait: portrait?.includes("http")
          ? portrait
          : getFiles(portrait.split(".")[0], portrait.split(".")[1]),
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
        draft: type === "draft" ? 1 : 0,
      }

      const editArticleCall = await editArticle(data)
      successAction = editArticleCall.status === 201

      for (let i = 0; i < newAttachmentsForServer.length; i += 1) {
        const fileData = saveFile(i)

        const formData = new FormData()

        if (fileData !== undefined) {
          const name = `${fileData.name.split(".")[0]}.${
            fileData.name.split(".")[1]
          }`
          formData.append("file", fileData.file)
          formData.append("fileName", name)

          //  eslint-disable-next-line no-await-in-loop
          const postFile: any = await sendFile(formData)
          successAction = postFile.status === 200
          setServerError(postFile.status !== 200)
        }
      }
    }

    if (successAction) {
      success()
    } else {
      setServerError(false)
    }
  }

  return (
    <ActionButtons>
      <InternalServerError
        visible={serverError}
        changeVisibility={() => setServerError(false)}
      />

      {warningMessage !== "" && (
        <WarningMessage>{warningMessage}</WarningMessage>
      )}
      <Button onClick={closeForm}>{texts.newArticleForm.discard}</Button>
      <Button
        onClick={() => {
          if (canPreview) {
            setPrevisualizeEdit(!previsualizeEdit)
            setWarningMessage("")
          } else {
            setWarningMessage(texts.newArticleForm.requiredMessage)
          }
        }}
      >
        {!previsualizeEdit
          ? `${texts.newArticleForm.visualize}`
          : `${texts.newArticleForm.edit}`}
      </Button>
      <Button
        onClick={() => {
          publishArticle("draft")
        }}
      >
        Guardar como borrador
      </Button>
      <Button
        type="primary"
        onClick={() => {
          if (canPreview) {
            publishArticle("publish")
            setWarningMessage("")
          } else {
            setWarningMessage(texts.newArticleForm.requiredMessage)
          }
        }}
      >
        {texts.newArticleForm.publish}
      </Button>
    </ActionButtons>
  )
}

export default ArticleButtons
