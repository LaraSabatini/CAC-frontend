import React, { useState } from "react"
import { useRouter } from "next/router"
import { deleteTraining } from "services/trainings/trainingActions.service"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { GrClose } from "react-icons/gr"
import { BsFillPlayFill } from "react-icons/bs"
import ModalStatus from "components/UI/ModalStatus"
import Tooltip from "components/UI/Tooltip"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import Modal from "components/UI/Modal"
import EditTraining from "../EditTraining"
import {
  Card,
  WatchButton,
  Player,
  IconButton,
  ButtonContainer,
} from "./styles"

interface TrainingCardInterface {
  id: number
  youtubeURL: string
  title: string
  description: string
  updateList: (arg?: any) => void
  author: string
  theme: number[]
  region: number[]
}

function TrainingCard({
  id,
  youtubeURL,
  title,
  description,
  updateList,
  author,
  theme,
  region,
}: TrainingCardInterface) {
  const router = useRouter()
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [serverError, setServerError] = useState<boolean>(false)

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [successModal, setSuccessModal] = useState<boolean>(false)

  const videoId = youtubeURL.split("v=")[1].split("&")[0]

  const deleteTrainingAction = async () => {
    const deleteTrainingCall = await deleteTraining(id)
    setSuccessModal(deleteTrainingCall.status === 200)
    setServerError(deleteTrainingCall.status !== 200)
    setOpenDeleteModal(false)
  }

  return (
    <Card background={`http://img.youtube.com/vi/${videoId}/hqdefault.jpg`}>
      <InternalServerError
        visible={serverError}
        changeVisibility={() => setServerError(false)}
      />
      {openModal && (
        <Modal>
          <Player isEditing={openEditModal}>
            {openDeleteModal && (
              <ModalStatus
                title="Estas seguro de que deseas eliminar esta capacitacion?"
                description="Al eliminarla se borraran todos los registros"
                status="warning"
                ctaButton={{
                  content: "Eliminar",
                  action: deleteTrainingAction,
                }}
                secondaryButton={{
                  content: "Cancelar",
                  action: () => setOpenDeleteModal(false),
                }}
              />
            )}
            {successModal && (
              <ModalStatus
                title="Excelente"
                description="La capacitacion se ha eliminado con exito"
                status="success"
                selfClose
                selfCloseAction={() => {
                  setSuccessModal(false)
                  setOpenModal(false)
                  updateList()
                }}
              />
            )}
            <div className="player-header">
              {!openEditModal ? (
                <h3>{router.query.title}</h3>
              ) : (
                <h3>Editar capacitacion:</h3>
              )}
              {!openEditModal && (
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
                      <IconButton
                        className="edit"
                        onClick={() => setOpenEditModal(true)}
                      >
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
              )}
            </div>
            {!openEditModal ? (
              <iframe
                width="90%"
                height="90%"
                src={`https://www.youtube.com/embed/${router.query.watch}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <EditTraining
                id={id}
                youtubeURL={youtubeURL}
                title={title}
                description={description}
                author={author}
                theme={theme}
                region={region}
                cancel={() => setOpenEditModal(false)}
                updateList={() => {
                  setOpenEditModal(false)
                  setOpenModal(false)
                  updateList()
                }}
              />
            )}
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
