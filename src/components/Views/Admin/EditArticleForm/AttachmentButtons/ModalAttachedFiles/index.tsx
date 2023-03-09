/* eslint-disable prefer-destructuring */
import React, { useContext } from "react"
import { ArticlesContext } from "contexts/Articles"
import { MdOutlineClose } from "react-icons/md"
import { AttachmentInterface } from "interfaces/content/Article"
import getFiles from "helpers/media/getFiles"
import texts from "strings/articles.json"
import Modal from "components/UI/Modal"
import Tooltip from "components/UI/Tooltip"
import axios from "axios"
import {
  AttachmentsList,
  Title,
  Item,
  ItemContainer,
  AttachmentsListHead,
  DeleteItemButton,
  CloseAttachmentsListButton,
  PortraitTag,
} from "../../../CreateArticleForm/AttachmentButtons/styles"

interface ModalAttachedFilesInterface {
  closeModal: (arg?: any) => void
}

function ModalAttachedFiles({ closeModal }: ModalAttachedFilesInterface) {
  const {
    newAttachmentsForDataBase,
    portrait,
    setPortrait,
    newAttachmentsForServer,
    setNewAttachmentsForDataBase,
    setNewAttachmentsForServer,
  } = useContext(ArticlesContext)

  const portraitImage = portrait as string
  let portraitName: string
  let portraitExtension: string

  if (portrait !== null && portraitImage.includes("file_name=")) {
    portraitName = portraitImage.split("file_name=")[1].split("&")[0]
    portraitExtension = portraitImage.split("file_extension=")[1]
  } else if (portrait !== null && !portraitImage.includes("file_name=")) {
    portraitName = portraitImage.split(".")[0]
    portraitExtension = portraitImage.split(".")[1]
  }

  const validatePortrait = async (file: AttachmentInterface) => {
    try {
      await axios.get(getFiles(file.name, file.extension))
      setPortrait(getFiles(file.name, file.extension))
    } catch (err: any) {
      setPortrait(`${file.name}.${file.extension}`)
    }
  }

  const removeFileFromList = (file: AttachmentInterface) => {
    const fileInDBArray = newAttachmentsForDataBase.filter(
      item => item !== file,
    )
    const fileInServerArray = newAttachmentsForServer.filter(
      item => item.name !== `${file.name}.${file.extension}`,
    )

    setNewAttachmentsForDataBase(fileInDBArray)
    setNewAttachmentsForServer(fileInServerArray)
  }

  return (
    <Modal>
      <AttachmentsList>
        <AttachmentsListHead>
          <Title>{texts.newArticleForm.attachedFiles}</Title>
          <CloseAttachmentsListButton onClick={closeModal}>
            <MdOutlineClose />
          </CloseAttachmentsListButton>
        </AttachmentsListHead>
        <ItemContainer>
          {newAttachmentsForDataBase.map(file => (
            <Item key={file.name}>
              {file.name}.{file.extension}
              <div className="actions">
                {file.type === "image" && (
                  <PortraitTag
                    active={
                      `${file.name}.${file.extension}` ===
                      `${portraitName}.${portraitExtension}`
                    }
                    onClick={() => {
                      validatePortrait(file)
                    }}
                  >
                    Portada
                  </PortraitTag>
                )}
                <Tooltip title={texts.newArticleForm.deleteFile}>
                  <DeleteItemButton
                    onClick={() => {
                      if (portrait === `${file.name}.${file.extension}`) {
                        setPortrait(null)
                      }
                      removeFileFromList(file)
                    }}
                  >
                    <MdOutlineClose />
                  </DeleteItemButton>
                </Tooltip>
              </div>
            </Item>
          ))}
        </ItemContainer>
      </AttachmentsList>
    </Modal>
  )
}

export default ModalAttachedFiles
