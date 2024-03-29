import React, { useContext } from "react"
import { ArticlesContext } from "contexts/Articles"
import { MdOutlineClose } from "react-icons/md"
import texts from "strings/articles.json"
import Modal from "components/UI/Modal"
import { Tooltip } from "antd"
import {
  AttachmentsList,
  Title,
  Item,
  ItemContainer,
  AttachmentsListHead,
  DeleteItemButton,
  CloseAttachmentsListButton,
  PortraitTag,
} from "../styles"

interface ModalAttachedFilesInterface {
  closeModal: (arg?: any) => void
}

function ModalAttachedFiles({ closeModal }: ModalAttachedFilesInterface) {
  const {
    attachmentsForDataBase,
    removeFileFromList,
    imageSelectedForPortrait,
    setImageSelectedForPortrait,
  } = useContext(ArticlesContext)

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
            <Item key={file.name}>
              {file.name}.{file.extension}
              <div className="actions">
                {file.type === "image" && (
                  <PortraitTag
                    active={
                      imageSelectedForPortrait ===
                      `${file.name}.${file.extension}`
                    }
                    onClick={() =>
                      setImageSelectedForPortrait(
                        `${file.name}.${file.extension}`,
                      )
                    }
                  >
                    Portada
                  </PortraitTag>
                )}
                <Tooltip title={texts.newArticleForm.deleteFile}>
                  <DeleteItemButton
                    onClick={() => {
                      if (
                        imageSelectedForPortrait ===
                        `${file.name}.${file.extension}`
                      ) {
                        setImageSelectedForPortrait(null)
                      }
                      removeFileFromList(file, "create")
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
