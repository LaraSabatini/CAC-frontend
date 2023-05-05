import React, { useContext, useState } from "react"
import { ArticlesContext } from "contexts/Articles"
import { uploadFile } from "services/articles/fileManagement.service"
import { createArticle } from "services/articles/articles.service"
import texts from "strings/articles.json"
import { dateFormated } from "helpers/dates/getToday"
import ArticleInterface from "interfaces/content/Article"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import { Button, Modal } from "antd"
import getFiles from "helpers/media/getFiles"
import { ActionButtons, WarningMessage } from "../styles"

interface ArticleButtonsFormInterface {
  closeForm: (arg?: any) => void
  updateList: (arg?: any) => void
}

function ArticleButtons({
  closeForm,
  updateList,
}: ArticleButtonsFormInterface) {
  const {
    previsualize,
    setPrevisualize,
    newArticle,
    attachmentsForDataBase,
    attachmentsForServer,
    imageSelectedForPortrait,
  } = useContext(ArticlesContext)

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [warningMessage, setWarningMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [serverError, setServerError] = useState<boolean>(false)

  const success = () => {
    Modal.success({
      title: "Excelente",
      content: `${texts.newArticleForm.success.description}`,
      onOk() {
        updateList()
      },
    })
  }

  const canPreview =
    newArticle.title !== "" &&
    newArticle.description !== "" &&
    newArticle.subtitle !== "" &&
    newArticle.regionFilters.length > 0 &&
    newArticle.article !== "" &&
    newArticle.author !== "" &&
    imageSelectedForPortrait !== null

  const saveFile = (index: number) => {
    return {
      file: attachmentsForServer[index],
      name: `${attachmentsForServer[index].name}.${
        attachmentsForServer[index].type.split("/")[1]
      }`,
    }
  }

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

  const publishArticle = async (type: "draft" | "publish") => {
    const portrait =
      imageSelectedForPortrait !== null
        ? getFiles(
            imageSelectedForPortrait.split(".")[0],
            imageSelectedForPortrait.split(".")[1],
          )
        : ""

    setLoading(true)
    let successStatus: boolean = false
    const data: ArticleInterface = {
      ...newArticle,
      createdBy: JSON.stringify({ id: userData.id, email: userData.user }),
      portrait,
      attachments: JSON.stringify(attachmentsForDataBase),
      regionFilters: JSON.stringify(newArticle.regionFilters),
      themeFilters: JSON.stringify(newArticle.themeFilters),
      changesHistory: JSON.stringify([
        {
          date: dateFormated,
          changedBy: { id: userData.id, email: userData.user },
          action: "CREATED",
        },
      ]),
      draft: type === "draft" ? 1 : 0,
    }
    const createArticleReq = await createArticle(data)
    successStatus = createArticleReq.status === 201
    for (let i = 0; i < attachmentsForServer.length; i += 1) {
      const fileData = saveFile(i)
      const formData = new FormData()
      if (fileData !== undefined) {
        formData.append("file", fileData.file)
        formData.append("fileName", fileData.name)
        // eslint-disable-next-line no-await-in-loop
        const postFile: any = await sendFile(formData)
        successStatus = postFile.status === 200
        setServerError(postFile.status !== 200)
      }
    }
    if (successStatus) {
      success()
      setLoading(false)
    } else {
      setServerError(true)
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
            setPrevisualize(!previsualize)
            setWarningMessage("")
          } else {
            setWarningMessage(texts.newArticleForm.requiredMessage)
          }
        }}
      >
        {!previsualize
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
        loading={loading}
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
