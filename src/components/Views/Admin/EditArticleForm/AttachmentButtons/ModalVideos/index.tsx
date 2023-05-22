import React, { useState, useContext } from "react"
import { ArticlesContext } from "contexts/Articles"
import { MdOutlineClose, MdAddCircleOutline } from "react-icons/md"
import texts from "strings/articles.json"
import getVideoURL from "helpers/media/getVideoURL"
import Modal from "components/UI/Modal"
import { Tooltip } from "antd"
import Input from "components/UI/Input"
import {
  Title,
  Item,
  ItemContainer,
  AttachmentsListHead,
  DeleteItemButton,
  CloseAttachmentsListButton,
  VideoModal,
  InputContainer,
  AddVideoButton,
} from "../../../CreateArticleForm/AttachmentButtons/styles"

interface ModalVideosInterface {
  closeModal: (arg?: any) => void
}

function ModalVideos({ closeModal }: ModalVideosInterface) {
  const {
    newAttachmentsForDataBase,
    setNewAttachmentsForDataBase,
    removeFileFromList,
  } = useContext(ArticlesContext)
  const [currentVideoURL, setCurrentVideoURL] = useState<string>("")

  const videoURLs = newAttachmentsForDataBase.filter(
    file => file.type === "video",
  )

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer")
  }

  // *** Guardar URL del video
  const addVideoToAttachments = () => {
    const URL = currentVideoURL.split("www.")
    const domain = URL[1].split(".com")

    setNewAttachmentsForDataBase([
      ...newAttachmentsForDataBase,
      {
        name: domain[0],
        extension: getVideoURL(currentVideoURL),
        type: "video",
      },
    ])

    setCurrentVideoURL("")
  }

  return (
    <Modal>
      <VideoModal>
        <AttachmentsListHead>
          <Title>{texts.newArticleForm.attachVideo}</Title>
          <CloseAttachmentsListButton onClick={closeModal}>
            <MdOutlineClose />
          </CloseAttachmentsListButton>
        </AttachmentsListHead>
        <InputContainer>
          <Input
            label="URL"
            required={false}
            type="text"
            onChange={e => setCurrentVideoURL(e.target.value)}
            value={currentVideoURL}
          />
          <AddVideoButton onClick={addVideoToAttachments}>
            <MdAddCircleOutline />
          </AddVideoButton>
        </InputContainer>
        <ItemContainer>
          {videoURLs.map(file => (
            <Item onClick={() => openInNewTab(file.extension)}>
              {file.name}
              <Tooltip title={texts.newArticleForm.deleteFile}>
                <DeleteItemButton
                  onClick={() => removeFileFromList(file, "edit")}
                >
                  <MdOutlineClose />
                </DeleteItemButton>
              </Tooltip>
            </Item>
          ))}
        </ItemContainer>
      </VideoModal>
    </Modal>
  )
}

export default ModalVideos
