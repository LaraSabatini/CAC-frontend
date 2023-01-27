import React, { useState, useEffect } from "react"
import getFiles from "helpers/media/getFiles"
import { AiOutlinePaperClip } from "react-icons/ai"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { AttachmentInterface, ExtensionType } from "interfaces/content/Article"
import { Container, Title, Content, Navigation, Indicator, Dot } from "./styles"

// SIZE RATIO:
//  width: 820px;
//  height: 513px;

type MediaViewerType =
  | {
      urls?: AttachmentInterface[]
      uri?: never
    }
  | {
      urls?: never
      uri?: {
        uri: string
        name: string
        extension: string
        type: ExtensionType
      }[]
    }

function MediaViewer(props: MediaViewerType) {
  const { urls, uri } = props

  const [files, setFiles] = useState<any>()

  const [currentFile, setCurrentFile] = useState<number>(0)

  const goPrev = () => {
    if (currentFile - 1 < 0) {
      setCurrentFile(files.length - 1)
    } else {
      setCurrentFile(currentFile - 1)
    }
  }
  const goNext = () => {
    if (currentFile + 1 > files.length - 1) {
      setCurrentFile(0)
    } else {
      setCurrentFile(currentFile + 1)
    }
  }

  useEffect(() => {
    if (typeof urls !== "undefined") {
      setFiles(urls)
    } else {
      setFiles(uri)
    }
    setCurrentFile(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {files !== undefined && (
        <Container>
          <Navigation>
            <button type="button" onClick={goPrev}>
              <BsChevronLeft />
            </button>
            <button type="button" onClick={goNext}>
              <BsChevronRight />
            </button>
          </Navigation>
          <Content>
            {files[currentFile].type === "image" && (
              <img
                alt={files[currentFile].name}
                src={
                  typeof uri !== "undefined"
                    ? files[currentFile].uri
                    : getFiles(
                        files[currentFile].name,
                        files[currentFile].extension,
                      )
                }
              />
            )}
            {files[currentFile].type === "file" && (
              <object
                type="application/pdf"
                data={
                  typeof uri !== "undefined"
                    ? files[currentFile].uri
                    : getFiles(
                        files[currentFile].name,
                        files[currentFile].extension,
                      )
                }
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={
                    typeof uri !== "undefined"
                      ? files[currentFile].uri
                      : getFiles(
                          files[currentFile].name,
                          files[currentFile].extension,
                        )
                  }
                >
                  Archivo
                </a>
              </object>
            )}
            {files[currentFile].type === "video" && (
              <iframe
                width="100%"
                height="100%"
                src={files[currentFile].extension}
                title="video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </Content>
          <div className="footer">
            {files[currentFile].type === "video" ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={files[currentFile].extension}
              >
                <Title>
                  <AiOutlinePaperClip />
                  {files[currentFile].type === "video" ? (
                    "Video de Youtube"
                  ) : (
                    <>
                      {files[currentFile].name}.{files[currentFile].extension}
                    </>
                  )}
                </Title>
              </a>
            ) : (
              <a
                target="_blank"
                rel="noreferrer"
                href={
                  typeof uri !== "undefined"
                    ? files[currentFile].uri
                    : getFiles(
                        files[currentFile].name,
                        files[currentFile].extension,
                      )
                }
              >
                <Title>
                  <AiOutlinePaperClip />
                  {files[currentFile].type === "video" ? (
                    "Video de Youtube"
                  ) : (
                    <>
                      {files[currentFile].name}.{files[currentFile].extension}
                    </>
                  )}
                </Title>
              </a>
            )}
            <Indicator>
              {files.length &&
                files.map((attachment: any, index: number) => (
                  <Dot key={attachment.name} active={currentFile === index} />
                ))}
            </Indicator>
          </div>
        </Container>
      )}
    </>
  )
}

export default MediaViewer
