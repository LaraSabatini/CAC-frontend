import React, {
  ChangeEvent,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react"
import { ArticlesContext } from "contexts/Articles"
import { AttachmentInterface, ExtensionType } from "interfaces/content/Article"
import texts from "strings/articles.json"
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
import { ActionButtons } from "../styles"

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

      const filesForDBArray: AttachmentInterface[] = [...attachmentsForDataBase]
      const filesForServerArray: File[] = [...attachmentsForServer]

      if (type === "image" && imageSelectedForPortrait === null) {
        setImageSelectedForPortrait(getPortraitName(files))
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

      setAttachmentsForServer(filesForServerArray)
      setAttachmentsForDataBase(filesForDBArray)
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

      {attachmentsForDataBase.length ? (
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

export default AttachmentButtons
