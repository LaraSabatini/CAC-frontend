import React, { useState, useContext } from "react"
import { DashboardContext } from "contexts/Dashboard"
import { MdOutlineClose, MdAddCircleOutline } from "react-icons/md"
import texts from "strings/articles.json"
import Modal from "components/UI/Modal"
import Tooltip from "components/UI/Tooltip"
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
} from "../styles"

interface ModalVideosInterface {
  closeModal: (arg?: any) => void
}

function ModalVideos({ closeModal }: ModalVideosInterface) {
  const {
    attachmentsForDataBase,
    setAttachmentsForDataBase,
    removeFileFromList,
  } = useContext(DashboardContext)
  const [currentVideoURL, setCurrentVideoURL] = useState<string>("")

  const videoURLs = attachmentsForDataBase.filter(file => file.type === "video")

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer")
  }

  // *** Guardar URL del video
  const addVideoToAttachments = () => {
    const URL = currentVideoURL.split("www.")
    const domain = URL[1].split(".com")

    const videoIdentifier = currentVideoURL.split("watch?v=")[1].split("&")[0]

    setAttachmentsForDataBase([
      ...attachmentsForDataBase,
      {
        name: domain[0],
        extension: `https://www.youtube.com/embed/${videoIdentifier}`,
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
                <DeleteItemButton onClick={() => removeFileFromList(file)}>
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