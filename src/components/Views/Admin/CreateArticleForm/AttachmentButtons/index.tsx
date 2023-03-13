import React, {
  ChangeEvent,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react"
import { AiOutlinePaperClip, AiOutlineEye } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import { ArticlesContext } from "contexts/Articles"
import { AttachmentInterface, ExtensionType } from "interfaces/content/Article"
import texts from "strings/articles.json"
import renameFile from "helpers/formatting/renameFile"
import getPortraitName from "helpers/media/getPortraitName"
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
    setImageSelectedForPortrait,
    imageSelectedForPortrait,
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

      if (type === "image" && imageSelectedForPortrait === null) {
        setImageSelectedForPortrait(getPortraitName(files))
      }

      const filesForDBArray: AttachmentInterface[] = [...attachmentsForDataBase]
      const filesForServerArray: File[] = [...attachmentsForServer]

      for (let i = 0; i < files.length; i += 1) {
        const fileRenamed = renameFile(e.target.files[i].name)

        filesForDBArray.push({
          name: fileRenamed,
          extension: e.target.files[i].name.split(".")[1],
          type,
        })

        filesForServerArray.push(files[i])
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

  const checkPortraitImage = () => {
    const filterImageFiles = attachmentsForDataBase.filter(
      f => f.type === "image",
    )

    if (filterImageFiles.length === 0) {
      setImageSelectedForPortrait(null)
    }
  }

  useEffect(() => {
    checkPortraitImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachmentsForDataBase])

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
