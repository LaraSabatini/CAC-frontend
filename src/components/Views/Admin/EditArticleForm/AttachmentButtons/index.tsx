import React, {
  useRef,
  useContext,
  ChangeEvent,
  useState,
  useEffect,
} from "react"
import { ArticlesContext } from "contexts/Articles"
import texts from "strings/articles.json"
import { AiOutlinePaperClip, AiOutlineEye } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import { AttachmentInterface, ExtensionType } from "interfaces/content/Article"
import renameFile from "helpers/formatting/renameFile"
import getPortraitName from "helpers/media/getPortraitName"
import Tooltip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import ModalAttachedFiles from "./ModalAttachedFiles"
import ModalVideos from "./ModalVideos"
import { ActionButtons, IconButton } from "../../CreateArticleForm/styles"

function AttachmentButton() {
  const {
    setNewAttachmentsForDataBase,
    newAttachmentsForDataBase,
    newAttachmentsForServer,
    setNewAttachmentsForServer,
    portrait,
    setPortrait,
  } = useContext(ArticlesContext)

  const [showAttachedFiles, setShowAttachedFiles] = useState<boolean>(false)
  const [addVideoURL, setAddVideoURL] = useState<boolean>(false)

  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const hiddenImageInput = useRef<HTMLInputElement>(null)

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: ExtensionType,
  ) => {
    if (e.target.files) {
      // *** Nombres de archivos deben ser asi: nombre.extension (ej: portada.jpeg)
      const { files } = e.target

      if (type === "image" && portrait === null) {
        setPortrait(getPortraitName(files))
      }

      const filesForDBArray: AttachmentInterface[] = [
        ...newAttachmentsForDataBase,
      ]
      const filesForServerArray: File[] = [...newAttachmentsForServer]

      for (let i = 0; i < files.length; i += 1) {
        const fileRenamed = renameFile(e.target.files[i].name)

        filesForDBArray.push({
          name: fileRenamed,
          extension: e.target.files[i].name.split(".")[1],
          type,
        })

        filesForServerArray.push(files[i])
      }
      setNewAttachmentsForDataBase(filesForDBArray)
      setNewAttachmentsForServer(filesForServerArray)
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

  const checkPortraitImage = () => {
    const filterImageFiles = newAttachmentsForDataBase.filter(
      f => f.type === "image",
    )

    if (filterImageFiles.length === 0) {
      setPortrait(null)
    }
  }

  useEffect(() => {
    checkPortraitImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAttachmentsForDataBase])

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
            accept="image/png, image/jpeg, image/jpg"
          />
          <Icon icon="IconImage" />
        </IconButton>
      </Tooltip>
      <Tooltip title={texts.newArticleForm.attachVideo}>
        <IconButton onClick={() => setAddVideoURL(true)}>
          <BsFillPlayFill />
        </IconButton>
      </Tooltip>
      {newAttachmentsForDataBase.length ? (
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

export default AttachmentButton
