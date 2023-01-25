import React, { ChangeEvent, useRef, useContext, useState } from "react"
import { AiOutlinePaperClip, AiOutlineEye } from "react-icons/ai"
import { MdOutlineClose } from "react-icons/md"
import { BsFillPlayFill } from "react-icons/bs"
import { DashboardContext } from "contexts/Dashboard"
import { AttachmentInterface, ExtensionType } from "interfaces/content/Article"
import texts from "strings/articles.json"
import Modal from "components/UI/Modal"
import Tooltip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import { ActionButtons, IconButton } from "../styles"
import {
  AttachmentsList,
  Title,
  Item,
  ItemContainer,
  AttachmentsListHead,
  DeleteItemButton,
  CloseAttachmentsListButton,
} from "./styles"

function AttachmentButtons() {
  const {
    setAttachmentsForDataBase,
    attachmentsForDataBase,
    attachmentsForServer,
    setAttachmentsForServer,
  } = useContext(DashboardContext)

  const [showAttachedFiles, setShowAttachedFiles] = useState<boolean>(false)

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
        filesForDBArray.push({
          name: e.target.files[i].name.split(".")[0],
          extension: e.target.files[i].name.split(".")[1],
          type,
        })
        filesForServerArray.push(files[i])
      }
      setAttachmentsForDataBase(filesForDBArray)
      setAttachmentsForServer(filesForServerArray)
    }
  }

  const handleClick = (type: "file" | "image") => {
    if (type === "file") {
      if (hiddenFileInput.current !== null) {
        hiddenFileInput.current.click()
      }
    } else if (hiddenImageInput.current !== null) {
      hiddenImageInput.current.click()
    }
  }

  const removeFileFromList = (file: AttachmentInterface) => {
    const fileInDBArray = attachmentsForDataBase.filter(item => item !== file)
    const fileInServerArray = attachmentsForServer.filter(
      item => item.name !== `${file.name}.${file.extension}`,
    )

    setAttachmentsForDataBase(fileInDBArray)
    setAttachmentsForServer(fileInServerArray)
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
        <IconButton>
          <BsFillPlayFill />
        </IconButton>
      </Tooltip>
      {attachmentsForDataBase.length ? (
        <Tooltip title="Ver archivos adjuntos">
          <IconButton onClick={() => setShowAttachedFiles(true)}>
            <AiOutlineEye />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
      {showAttachedFiles && (
        <Modal>
          <AttachmentsList>
            <AttachmentsListHead>
              <Title>Archivos adjuntos</Title>
              <CloseAttachmentsListButton
                onClick={() => setShowAttachedFiles(false)}
              >
                <MdOutlineClose />
              </CloseAttachmentsListButton>
            </AttachmentsListHead>
            <ItemContainer>
              {attachmentsForDataBase.map(file => (
                <Item>
                  {file.name}.{file.extension}
                  <Tooltip title="Borrar archivo">
                    <DeleteItemButton onClick={() => removeFileFromList(file)}>
                      <MdOutlineClose />
                    </DeleteItemButton>
                  </Tooltip>
                </Item>
              ))}
            </ItemContainer>
          </AttachmentsList>
        </Modal>
      )}
    </ActionButtons>
  )
}

export default AttachmentButtons
