import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import {
  deleteTraining,
  editTraining,
} from "services/trainings/trainingActions.service"
import {
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons"
import { Modal, Button, Input, Select } from "antd"
import { TrainingsInterface } from "interfaces/trainings/Trainings"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import { filterList } from "const/filters"

import { Card, WatchButton, Player } from "./styles"
import { InputContainer } from "../AddTraining/styles"

interface TrainingCardInterface {
  id: number
  youtubeURL: string
  title: string
  description: string
  author: string
  theme: number[] | string
  region: number[] | string
}

function TrainingCard({
  id,
  youtubeURL,
  title,
  description,
  author,
  theme,
  region,
}: TrainingCardInterface) {
  const router = useRouter()
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const trainingTheme = JSON.parse(theme as string)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [serverError, setServerError] = useState<boolean>(false)

  const [modalContent, setModalContent] = useState<"view" | "edit">("view")
  const videoId = youtubeURL.split("v=")[1].split("&")[0]

  const [requiredError, setRequiredError] = useState<boolean>(false)
  const [trainingEdited, setTrainingEdited] = useState<TrainingsInterface>({
    id,
    youtubeURL,
    title,
    author,
    description,
    theme: trainingTheme,
    region,
  })

  const [themesSelected, setThemesSelected] = useState<string[]>()

  useEffect(() => {
    const list: string[] = []
    trainingTheme.forEach((item: number) => {
      const filterItem = filterList.filter(bb => bb.id === item)
      if (filterItem.length > 0) {
        list.push(filterItem[0].value)
      }
    })
    setThemesSelected(list)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { confirm } = Modal
  const { TextArea } = Input

  const success = () => {
    Modal.success({
      content: "Acción realizada con éxito con éxito",
      onOk() {
        setOpenModal(false)
        delete router.query.watch
        delete router.query.title
        router.push(router)
        window.location.reload()
      },
    })
  }

  const deleteTrainingAction = async () => {
    const deleteTrainingCall = await deleteTraining(id)
    if (deleteTrainingCall.status === 200) {
      success()
    }
    setServerError(deleteTrainingCall.status !== 200)
  }

  const showConfirm = () => {
    confirm({
      title: "¿Estás seguro de que deseas eliminar esta capacitación?",
      icon: <ExclamationCircleFilled />,
      content: "Al eliminarla se borrarán todos los registros",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteTrainingAction()
      },
    })
  }

  const saveEdition = async () => {
    if (
      trainingEdited.title !== "" &&
      trainingEdited.author !== "" &&
      trainingEdited.description !== "" &&
      trainingEdited.youtubeURL !== ""
    ) {
      setRequiredError(false)
      const editTrainingCall = await editTraining({
        ...trainingEdited,
        theme: JSON.stringify(trainingEdited.theme),
      })

      if (editTrainingCall.status === 201) {
        success()
      } else {
        setServerError(true)
      }
    } else {
      setRequiredError(true)
    }
  }

  return (
    <Card background={`http://img.youtube.com/vi/${videoId}/hqdefault.jpg`}>
      <Modal
        title={
          modalContent === "view"
            ? router.query.title
            : `Editar capacitación: ${router.query.title}`
        }
        open={openModal}
        onCancel={() => {
          setOpenModal(false)
          delete router.query.watch
          delete router.query.title
          router.push(router)
        }}
        footer={
          userData?.type === "admin"
            ? [
                <Button
                  onClick={
                    modalContent === "view"
                      ? showConfirm
                      : () => {
                          setModalContent("view")
                          setTrainingEdited({
                            id,
                            youtubeURL,
                            title,
                            author,
                            description,
                            theme: trainingTheme,
                            region,
                          })
                        }
                  }
                  danger={modalContent === "view"}
                  icon={modalContent === "view" && <DeleteOutlined />}
                >
                  {modalContent === "view" ? "Eliminar" : "Cancelar"}
                </Button>,
                <Button
                  type={modalContent === "edit" ? "primary" : "default"}
                  onClick={
                    modalContent === "view"
                      ? () => setModalContent("edit")
                      : saveEdition
                  }
                  icon={modalContent === "view" && <EditOutlined />}
                >
                  {modalContent === "view" ? "Editar" : "Guardar cambios"}
                </Button>,
              ]
            : null
        }
        width={modalContent === "view" ? 1000 : 600}
        style={{ top: 20 }}
      >
        <InternalServerError
          visible={serverError}
          changeVisibility={() => setServerError(false)}
        />
        {modalContent === "view" ? (
          <Player>
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
        ) : (
          <div>
            {requiredError && (
              <p style={{ color: "#c12929" }} className="required-error">
                *Completa todos los campos requeridos
              </p>
            )}
            <InputContainer>
              <div className="sub-container">
                <Input
                  placeholder="Título"
                  required
                  status={
                    requiredError && trainingEdited.title === "" ? "error" : ""
                  }
                  type="text"
                  value={trainingEdited.title}
                  onChange={e =>
                    setTrainingEdited({
                      ...trainingEdited,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="sub-container">
                <Input
                  placeholder="Autor"
                  required
                  type="text"
                  value={trainingEdited.author}
                  status={
                    requiredError && trainingEdited.author === "" ? "error" : ""
                  }
                  style={{ width: "300px" }}
                  onChange={e =>
                    setTrainingEdited({
                      ...trainingEdited,
                      author: e.target.value,
                    })
                  }
                />
              </div>
              <div className="sub-container">
                <TextArea
                  rows={2}
                  placeholder="Descripción"
                  value={trainingEdited.description}
                  status={
                    requiredError && trainingEdited.description === ""
                      ? "error"
                      : ""
                  }
                  onChange={e =>
                    setTrainingEdited({
                      ...trainingEdited,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="sub-container">
                <Input
                  placeholder="URL de YouTube"
                  required
                  type="text"
                  value={trainingEdited.youtubeURL}
                  status={
                    requiredError && trainingEdited.youtubeURL === ""
                      ? "error"
                      : ""
                  }
                  onChange={e =>
                    setTrainingEdited({
                      ...trainingEdited,
                      youtubeURL: e.target.value,
                    })
                  }
                />
              </div>
              <div className="sub-container">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: 475 }}
                  placeholder="Temáticas"
                  defaultValue={themesSelected}
                  onChange={value => {
                    setThemesSelected(value)
                    const ids: number[] = []
                    value.forEach(item => {
                      const filterItem = filterList.filter(
                        themeItem => themeItem.value === item,
                      )
                      if (filterItem.length > 0) {
                        ids.push(filterItem[0].id)
                      }
                    })
                    setTrainingEdited({
                      ...trainingEdited,
                      theme: ids,
                    })
                  }}
                  options={filterList}
                />
              </div>
            </InputContainer>
          </div>
        )}
      </Modal>
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
        <CaretRightOutlined />
      </WatchButton>
      <div className="info">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </div>
    </Card>
  )
}

export default TrainingCard
