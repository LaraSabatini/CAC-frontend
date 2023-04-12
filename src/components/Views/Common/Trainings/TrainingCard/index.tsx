import React, { useState } from "react"
import { useRouter } from "next/router"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { GrClose } from "react-icons/gr"
import { BsFillPlayFill } from "react-icons/bs"
import ModalStatus from "components/UI/ModalStatus"
import Tooltip from "components/UI/Tooltip"
import Modal from "components/UI/Modal"
import {
  Card,
  WatchButton,
  Player,
  IconButton,
  ButtonContainer,
} from "./styles"

interface TrainingCardInterface {
  youtubeURL: string
  title: string
  description: string
}

function TrainingCard({
  youtubeURL,
  title,
  description,
}: TrainingCardInterface) {
  const router = useRouter()
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [openModal, setOpenModal] = useState<boolean>(false)

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const videoId = youtubeURL.split("v=")[1].split("&")[0]

  return (
    <Card background={`http://img.youtube.com/vi/${videoId}/hqdefault.jpg`}>
      {openModal && (
        <Modal>
          <Player>
            {openDeleteModal && (
              <ModalStatus
                title="Estas seguro de que deseas eliminar esta capacitacion?"
                description="Al eliminarla se borraran todos los registros"
                status="warning"
                ctaButton={{
                  content: "Eliminar",
                  action: () => console.log("eliminar"),
                }}
                secondaryButton={{
                  content: "Cancelar",
                  action: () => setOpenDeleteModal(false),
                }}
              />
            )}
            <div className="player-header">
              <h3>{router.query.title}</h3>
              <ButtonContainer>
                {userData?.type === "admin" && (
                  <>
                    <IconButton
                      className="delete"
                      onClick={() => setOpenDeleteModal(true)}
                    >
                      <Tooltip title="Eliminar capacitacion">
                        <AiOutlineDelete />
                      </Tooltip>
                    </IconButton>
                    <IconButton className="edit">
                      <Tooltip title="Eliminar capacitacion">
                        <AiOutlineEdit />
                      </Tooltip>
                    </IconButton>
                  </>
                )}
                <IconButton
                  type="button"
                  onClick={() => {
                    delete router.query.watch
                    delete router.query.title
                    router.push(router)
                    setOpenModal(false)
                  }}
                >
                  <GrClose />
                </IconButton>
              </ButtonContainer>
            </div>
            <iframe
              width="90%"
              height="90%"
              src={`https://www.youtube.com/embed/${router.query.watch}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </Player>
        </Modal>
      )}
      <WatchButton
        className="watch"
        type="button"
        onClick={() => {
          router.query.watch = videoId
          router.query.title = title
          router.push(router)
          setOpenModal(true)
        }}
      >
        <BsFillPlayFill />
      </WatchButton>
      <div className="info">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </div>
    </Card>
  )
}

export default TrainingCard
