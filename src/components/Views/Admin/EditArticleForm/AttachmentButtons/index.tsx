import React, {
  useRef,
  useContext,
  ChangeEvent,
  useState,
  useEffect,
} from "react"
import { ArticlesContext } from "contexts/Articles"
import texts from "strings/articles.json"
import { AttachmentInterface, ExtensionType } from "interfaces/content/Article"
import getPortraitName from "helpers/media/getPortraitName"
import { Button, Tooltip } from "antd"
import {
  PaperClipOutlined,
  FileImageOutlined,
  CaretRightOutlined,
  EyeOutlined,
} from "@ant-design/icons"
import ModalAttachedFiles from "./ModalAttachedFiles"
import ModalVideos from "./ModalVideos"
import { ActionButtons } from "../../CreateArticleForm/styles"

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

      const filesForDBArray: AttachmentInterface[] = [
        ...newAttachmentsForDataBase,
      ]
      const filesForServerArray: File[] = [...newAttachmentsForServer]

      if (type === "image" && portrait === null) {
        setPortrait(getPortraitName(files))
      }

      for (let i = 0; i < files.length; i += 1) {
        const originalName = files[i].name

        const fileRenamed = originalName.replaceAll(" ", "-")

        filesForDBArray.push({
          name: fileRenamed.split(".")[0],
          extension: e.target.files[i].name.split(".")[1],
          type,
        })

        const newFile = new File([files[i]], fileRenamed, {
          type: files[i].type,
        })

        filesForServerArray.push(newFile)
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
        <Button
          onClick={() => handleClick("file")}
          icon={<PaperClipOutlined />}
        >
          <input
            ref={hiddenFileInput}
            style={{ display: "none" }}
            type="file"
            multiple
            onChange={e => handleFileChange(e, "file")}
            accept=".pdf"
          />
        </Button>
      </Tooltip>

      <Tooltip title={texts.newArticleForm.attachImage}>
        <Button
          onClick={() => handleClick("image")}
          icon={<FileImageOutlined />}
        >
          <input
            ref={hiddenImageInput}
            style={{ display: "none" }}
            type="file"
            multiple
            onChange={e => handleFileChange(e, "image")}
            accept="image/png, image/jpeg, image/jpg"
          />
        </Button>
      </Tooltip>

      <Tooltip title={texts.newArticleForm.attachVideo}>
        <Button onClick={() => setAddVideoURL(true)}>
          <CaretRightOutlined />
        </Button>
      </Tooltip>

      {newAttachmentsForDataBase.length ? (
        <Tooltip title={texts.newArticleForm.seeAttachments}>
          <Button onClick={() => setShowAttachedFiles(true)}>
            <EyeOutlined />
          </Button>
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
