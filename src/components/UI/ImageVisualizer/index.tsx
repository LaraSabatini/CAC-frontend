import React, { useState, useRef, useEffect } from "react"
// import { LayoutContext } from "contexts/LayoutContext"
// import getFormsTexts from "services/getFormsTexts.service"
// import IconButton from "components/UI/IconButton"
import {
  AiFillDelete,
  AiOutlineDownload,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlinePaperClip,
} from "react-icons/ai"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import Tooltip from "../Tooltip"

import {
  ViewerWrapper,
  ViewerContainer,
  ViewerLabel,
  FileTitle,
  RightTopIcons,
  FileContainer,
  SelectedImageContainer,
  FileIndex,
  LeftArrowContainer,
  RightArrowContainer,
  ButtonContainer,
  DeleteIcon,
  ButtonZoom,
  ScrollViewFile,
} from "./styles"
import Icon from "../Assets/Icon/index"

export interface ImageVisualizerInterface {
  deleteFile?: () => void
  onChange?: (
    actualAttachedFileId: number,
    actualAttachedFileIndex: number,
  ) => void
  canDownload?: boolean
  data:
    | {
        success: true
        data: ArrayContent[]
      }
    | {
        success: false
        data: {
          text: string
          icon: string
        }
      }
}

interface ArrayContent {
  attached_file_id: number
  description: string
  document_name: string
  extension: string
  file: string
}

function ImageVisualizer({
  data,
  deleteFile,
  onChange,
  canDownload,
}: ImageVisualizerInterface) {
  //   const { formsTexts, setFormsTexts } = useContext(LayoutContext)

  //   const [visualizerTexts, setVisualizerTexts] = useState<{
  //     component_label?: string
  //     delete_tooltip?: string
  //     download_tooltip?: string
  //     zoom_out_tooltip?: string
  //     zoom_in_tooltip?: string
  //   }>({})
  console.log(data)

  const visualizerTexts = {
    component_label: "",
    delete_tooltip: "delete_tooltip",
    download_tooltip: "download_tooltip",
    zoom_out_tooltip: "zoom_out_tooltip",
    zoom_in_tooltip: "zoom_in_tooltip",
  }

  const zoomInButton = useRef(null)
  const zoomOutButton = useRef(null)

  // counts the clicks for zoom
  const [clicks, setClicks] = useState(0)

  // sets the index of the image in the slide.
  const [currentFile, setCurrentFile] = useState(0)

  /* ---------------- Zoom Functions ----------------*/
  const zoomIn = () => {
    if (clicks < 5) {
      setClicks(clicks + 1)
    }
  }

  const zoomOut = () => {
    if (clicks > 0) {
      setClicks(clicks - 1)
    }
  }

  /* ---------- Change Image ------------*/
  const nextImage = () => {
    if (data.success) {
      setCurrentFile(currentFile === data.data.length - 1 ? 0 : currentFile + 1)
      setClicks(0)
      if (onChange !== undefined) {
        onChange(
          data.data[currentFile === data.data.length - 1 ? 0 : currentFile + 1]
            .attached_file_id,
          currentFile === data.data.length - 1 ? 0 : currentFile + 1,
        )
      }
    }
  }

  const prevImage = () => {
    if (data.success) {
      setCurrentFile(currentFile === 0 ? data.data.length - 1 : currentFile - 1)
      setClicks(0)
      if (onChange !== undefined) {
        onChange(
          data.data[currentFile === 0 ? data.data.length - 1 : currentFile - 1]
            .attached_file_id,
          currentFile === 0 ? data.data.length - 1 : currentFile - 1,
        )
      }
    }
  }

  const changeImage = (index: number) => {
    setCurrentFile(index)
    setClicks(0)
    if (onChange !== undefined) {
      const dataAsArrayContent = data.data as ArrayContent[]
      onChange(dataAsArrayContent[index].attached_file_id, index)
    }
  }

  //   const renderingStart = async () => {
  //     if (formsTexts !== undefined && formsTexts !== null) {
  //       setVisualizerTexts(formsTexts.form_text_frontend.attached_file)
  //     } else {
  //       const resTexts = await getFormsTexts()
  //       setFormsTexts(resTexts)
  //       setVisualizerTexts(resTexts.form_text_frontend.attached_file)
  //     }
  //   }

  useEffect(() => {
    // if (
    //   visualizerTexts === undefined ||
    //   visualizerTexts.component_label === undefined
    // ) {
    // //   renderingStart()
    // }
    if (
      data.success &&
      data.data.length > 0 &&
      data.data[currentFile] === undefined
    ) {
      if (data.data[currentFile - 1] === undefined) {
        setCurrentFile(0)
      } else {
        setCurrentFile(currentFile - 1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <ViewerWrapper>
      <ViewerLabel>{visualizerTexts?.component_label}</ViewerLabel>
      {data.success === false ? (
        <ViewerContainer>
          <FileTitle>
            {/* <Icon icon="IconPaperClip" color="white" /> */}
            <AiOutlinePaperClip style={{ color: "white" }} />
            <div className="texts">
              <p className="file-title">{data.data.text}</p>
              <p className="file-name">-</p>
            </div>
          </FileTitle>
          <Icon icon={data.data.icon} />
        </ViewerContainer>
      ) : (
        <ViewerContainer>
          <FileTitle>
            {/* <Icon icon="IconPaperClip" color="white" /> */}
            <AiOutlinePaperClip
              style={{ color: "white", width: "20px", height: "20px" }}
            />
            <div className="texts">
              <p className="file-title">{`${data.data[currentFile]?.description}`}</p>
              <p className="file-name">{`${data.data[currentFile]?.document_name}${data.data[currentFile]?.extension}`}</p>
            </div>
          </FileTitle>
          <RightTopIcons>
            {deleteFile !== undefined && (
              <DeleteIcon className="delete" onClick={deleteFile}>
                {/* <IconButton
                  icon="IconRemove"
                  active="enabled"
                  icon_color="white"
                  tooltip={visualizerTexts?.delete_tooltip}
                /> */}
                <AiFillDelete />
              </DeleteIcon>
            )}
            {canDownload && (
              <div className="download">
                <a
                  href={`data:image/jpg;base64,${data.data[currentFile]?.file}`}
                  download={`${
                    data.data[currentFile]?.document_name +
                    data.data[currentFile]?.extension
                  }`}
                >
                  {/* <IconButton
                    icon="IconDownload"
                    active="enabled"
                    tooltip={visualizerTexts?.download_tooltip}
                    icon_color="white"
                  /> */}
                  <AiOutlineDownload />
                </a>
              </div>
            )}
          </RightTopIcons>
          {data.data.length > 1 && (
            <div>
              <LeftArrowContainer onClick={prevImage}>
                {/* <Icon icon="IconArrowLeft" color="white" /> */}
                <BsChevronLeft />
              </LeftArrowContainer>
              <RightArrowContainer onClick={nextImage}>
                {/* <Icon icon="IconArrowRight" color="white" /> */}
                <BsChevronRight />
              </RightArrowContainer>
            </div>
          )}
          <ScrollViewFile>
            <FileContainer
              clicks={clicks}
              isPDF={data.data[currentFile]?.extension === ".pdf"}
              arrowsAreActive={data.data.length > 1}
            >
              {data.data.length > 0 && (
                <>
                  {data.data.map((file, index) => (
                    <div key={file.attached_file_id}>
                      {index === currentFile && file.extension !== ".pdf" && (
                        <img
                          src={`data:image/jpg;base64,${file.file}`}
                          alt={file.description}
                          className="image"
                        />
                      )}
                    </div>
                  ))}
                  {data.data[currentFile]?.extension === ".pdf" && (
                    <embed
                      src={`data:application/pdf;base64,${data.data[currentFile]?.file}`}
                      title={data.data[currentFile]?.document_name}
                      className="pdf"
                    />
                  )}
                </>
              )}
            </FileContainer>
          </ScrollViewFile>
          <SelectedImageContainer>
            {data.data.length &&
              data.data[currentFile]?.extension !== ".pdf" &&
              data.data.map((file, index) => (
                <FileIndex
                  key={file.attached_file_id}
                  fileIndex={index}
                  currentFile={currentFile}
                  onClick={() => changeImage(index)}
                />
              ))}
          </SelectedImageContainer>
          {data.data[currentFile]?.extension !== ".pdf" && (
            <ButtonContainer>
              <Tooltip
                title={visualizerTexts?.zoom_out_tooltip}
                placement="top"
              >
                <ButtonZoom type="button" onClick={zoomOut} ref={zoomOutButton}>
                  {/* <Icon icon="IconLess" /> */}
                  <AiOutlineMinus />
                </ButtonZoom>
              </Tooltip>
              <Tooltip title={visualizerTexts?.zoom_in_tooltip} placement="top">
                <ButtonZoom
                  className="zoom-btn"
                  type="button"
                  onClick={zoomIn}
                  ref={zoomInButton}
                >
                  {/* <Icon icon="IconPlus" /> */}
                  <AiOutlinePlus />
                </ButtonZoom>
              </Tooltip>
            </ButtonContainer>
          )}
        </ViewerContainer>
      )}
    </ViewerWrapper>
  )
}

export default ImageVisualizer
