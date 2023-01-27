import React, { ChangeEvent, useRef, useContext, useState } from "react"
import { AiOutlinePaperClip, AiOutlineEye } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import { DashboardContext } from "contexts/Dashboard"
import { AttachmentInterface, ExtensionType } from "interfaces/content/Article"
import texts from "strings/articles.json"
import renameFile from "helpers/formatting/renameFile"
import Tooltip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import ModalAttachedFiles from "./ModalAttachedFiles"
import ModalVideos from "./ModalVideos"
import { ActionButtons, IconButton } from "../styles"

function AttachmentButtons() {
  const {
    setAttachmentsForDataBase,
    attachmentsForDataBase,
    attachmentsForServer,
    setAttachmentsForServer,
  } = useContext(DashboardContext)

  const [showAttachedFiles, setShowAttachedFiles] = useState<boolean>(false)
  const [addVideoURL, setAddVideoURL] = useState<boolean>(false)

  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const hiddenImageInput = useRef<HTMLInputElement>(null)

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: ExtensionType,
  ) => {
    if (e.target.files) {
      const { files } = e.target

      const filesForDBArray: AttachmentInterface[] = [...attachmentsForDataBase]
      const filesForServerArray: File[] = [...attachmentsForServer]

      for (let i = 0; i < files.length; i += 1) {
        const fileRenamed = renameFile(e.target.files[i].name)

        filesForDBArray.push({
          name: fileRenamed,
          extension: e.target.files[i].name.split(".")[1],
          type,
        })

        const file = new File([files[i]], fileRenamed)
        filesForServerArray.push(file)
      }
      setAttachmentsForDataBase(filesForDBArray)
      setAttachmentsForServer(filesForServerArray)
    }
  }

  // *** Disparar click en input para adjuntar archivos
  const handleClick = (type: "file" | "image") => {
    if (type === "file") {
      if (hiddenFileInput.current !== null) {
        hiddenFileInput.current.click()
      }
    } else if (hiddenImageInput.current !== null) {
      hiddenImageInput.current.click()
    }
  }

  return (
    <ActionButtons>
      <Tooltip title={texts.newArticleForm.attachFile}>
        <IconButton onClick={() => handleClick("file")}>
          <input
            ref={hiddenFileInput}
            style={{ display: "none" }}
            type="file"
            multiple
            onChange={e => handleFileChange(e, "file")}
            accept=".pdf"
          />
          <AiOutlinePaperClip />
        </IconButton>
      </Tooltip>
      <Tooltip title={texts.newArticleForm.attachImage}>
        <IconButton onClick={() => handleClick("image")}>
          <input
            ref={hiddenImageInput}
            style={{ display: "none" }}
            type="file"
            multiple
            onChange={e => handleFileChange(e, "image")}
            accept="image/*"
          />
          <Icon icon="IconImage" />
        </IconButton>
      </Tooltip>
      <Tooltip title={texts.newArticleForm.attachVideo}>
        <IconButton onClick={() => setAddVideoURL(true)}>
          <BsFillPlayFill />
        </IconButton>
      </Tooltip>
      {attachmentsForDataBase.length ? (
        <Tooltip title={texts.newArticleForm.seeAttachments}>
          <IconButton onClick={() => setShowAttachedFiles(true)}>
            <AiOutlineEye />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
      {showAttachedFiles && (
        <ModalAttachedFiles closeModal={() => setShowAttachedFiles(false)} />
      )}
      {addVideoURL && <ModalVideos closeModal={() => setAddVideoURL(false)} />}
    </ActionButtons>
  )
}

export default AttachmentButtons
