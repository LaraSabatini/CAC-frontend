import React, { useContext, useState } from "react"
import { DashboardContext } from "contexts/Dashboard"
import uploadFile from "services/articles/fileManagement.service"
import { createArticle } from "services/articles/articles.service"
import texts from "strings/articles.json"
import { dateFormated } from "helpers/dates/getToday"
import ModalStatus from "components/UI/ModalStatus"
import Button from "components/UI/Button"
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
  } = useContext(DashboardContext)

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [warningMessage, setWarningMessage] = useState<string>("")
  const [createdArticle, setCreatedArticle] = useState<boolean>(false)

  const findPortrait = attachmentsForDataBase.filter(
    file => file.type === "image",
  )

  const canPreview =
    newArticle.title !== "" &&
    newArticle.description !== "" &&
    newArticle.subtitle !== "" &&
    newArticle.regionFilters.length &&
    newArticle.article !== "" &&
    newArticle.author !== "" &&
    findPortrait.length > 0

  const saveFile = (index: number) => {
    return {
      file: attachmentsForServer[index],
      name: attachmentsForServer[index].name,
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

  const publishArticle = async () => {
    let success: boolean = false
    const data = {
      ...newArticle,
      createdBy: JSON.stringify({ id: userData.id, email: userData.user }),
      portrait: getFiles(findPortrait[0].name, findPortrait[0].extension),
      attachments: JSON.stringify(attachmentsForDataBase),
      regionFilters: JSON.stringify(newArticle.regionFilters),
      themeFilters: JSON.stringify(newArticle.themeFilters),
      changesHistory: JSON.stringify({
        date: dateFormated,
        changedBy: { id: userData.id, email: userData.user },
        action: "CREATED",
      }),
    }

    const createArticleReq = await createArticle(data)

    success = createArticleReq.status === 201

    for (let i = 0; i < attachmentsForServer.length; i += 1) {
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

    setCreatedArticle(success)
  }

  return (
    <ActionButtons>
      {createdArticle && (
        <ModalStatus
          title="Excelente"
          description="El articulo se ha creado correctamente."
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
          if (canPreview) {
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
