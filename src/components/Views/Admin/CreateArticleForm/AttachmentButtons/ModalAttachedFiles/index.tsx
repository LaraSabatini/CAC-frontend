import React, { useContext } from "react"
import { DashboardContext } from "contexts/Dashboard"
import { MdOutlineClose } from "react-icons/md"
import texts from "strings/articles.json"
import Modal from "components/UI/Modal"
import Tooltip from "components/UI/Tooltip"
import {
  AttachmentsList,
  Title,
  Item,
  ItemContainer,
  AttachmentsListHead,
  DeleteItemButton,
  CloseAttachmentsListButton,
} from "../styles"

interface ModalAttachedFilesInterface {
  closeModal: (arg?: any) => void
}

function ModalAttachedFiles({ closeModal }: ModalAttachedFilesInterface) {
  const { attachmentsForDataBase, removeFileFromList } = useContext(
    DashboardContext,
  )

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
          {attachmentsForDataBase.map(file => (
            <Item>
              {file.name}.{file.extension}
              <Tooltip title={texts.newArticleForm.deleteFile}>
                <DeleteItemButton onClick={() => removeFileFromList(file)}>
                  <MdOutlineClose />
                </DeleteItemButton>
              </Tooltip>
            </Item>
          ))}
        </ItemContainer>
      </AttachmentsList>
    </Modal>
  )
}

export default ModalAttachedFiles
