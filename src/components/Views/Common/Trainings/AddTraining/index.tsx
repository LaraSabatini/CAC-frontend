import React, { useState } from "react"
import { createTraining } from "services/trainings/trainingActions.service"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import { Button, Modal, Input, Select } from "antd"
import { TrainingsInterface } from "interfaces/trainings/Trainings"
import { filterList } from "const/filters"
import { CreateTraining } from "../styles"
import { InputContainer } from "./styles"

function AddTraining({ updateList }: { updateList: (arg?: any) => void }) {
  const userData = JSON.parse(localStorage.getItem("userData") as string)
  const [openModal, setOpenModal] = useState<boolean>()

  const [newTraining, setNewTraining] = useState<TrainingsInterface>({
    youtubeURL: "",
    title: "",
    author: "",
    description: "",
    theme: [],
    region: [],
  })
  const [requiredError, setRequiredError] = useState<boolean>(false)
  const [themesSelected, setThemesSelected] = useState<string[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [serverError, setServerError] = useState<boolean>(false)

  const { TextArea } = Input

  const cleanStates = () => {
    setThemesSelected([])
    setRequiredError(false)
    setLoading(false)
    setNewTraining({
      youtubeURL: "",
      title: "",
      author: "",
      description: "",
      theme: [],
      region: [],
    })
  }

  const success = () => {
    Modal.success({
      content: "La capacitacion se ha creado con exito",
      onOk() {
        updateList()
        setOpenModal(false)
        cleanStates()
      },
    })
  }

  const createTrainingFuncion = async () => {
    if (
      newTraining.title !== "" &&
      newTraining.author !== "" &&
      newTraining.description !== "" &&
      newTraining.youtubeURL !== ""
    ) {
      setLoading(true)
      setRequiredError(false)
      const createTrainingCall = await createTraining({
        ...newTraining,
        region: JSON.stringify(newTraining.region),
        theme: JSON.stringify(newTraining.theme),
      })

      if (createTrainingCall.status === 201) {
        success()
      } else {
        setServerError(true)
      }
    } else {
      setRequiredError(true)
    }
  }

  return (
    <div className="container-head">
      {userData?.type === "admin" && (
        <CreateTraining>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Crear capacitacion
          </Button>
        </CreateTraining>
      )}
      <Modal
        title="Crear capacitacion"
        open={openModal}
        onOk={createTrainingFuncion}
        onCancel={() => {
          setOpenModal(false)
          cleanStates()
        }}
        okText="Crear"
        cancelText="Cancelar"
        confirmLoading={loading}
      >
        <InternalServerError
          visible={serverError}
          changeVisibility={() => setServerError(false)}
        />
        <InputContainer>
          {requiredError && (
            <p className="required-error">
              *Completa todos los campos requeridos
            </p>
          )}
          <div className="sub-container">
            <Input
              placeholder="Titulo"
              required
              value={newTraining.title}
              status={requiredError && newTraining.title === "" ? "error" : ""}
              type="text"
              onChange={e =>
                setNewTraining({ ...newTraining, title: e.target.value })
              }
            />
          </div>
          <div className="sub-container">
            <Input
              placeholder="Autor"
              required
              type="text"
              value={newTraining.author}
              status={requiredError && newTraining.author === "" ? "error" : ""}
              style={{ width: "300px" }}
              onChange={e =>
                setNewTraining({ ...newTraining, author: e.target.value })
              }
            />
          </div>
          <div className="sub-container">
            <TextArea
              rows={2}
              placeholder="Descripcion"
              value={newTraining.description}
              status={
                requiredError && newTraining.description === "" ? "error" : ""
              }
              onChange={e =>
                setNewTraining({ ...newTraining, description: e.target.value })
              }
            />
          </div>
          <div className="sub-container">
            <Input
              placeholder="URL de YouTube"
              required
              type="text"
              value={newTraining.youtubeURL}
              status={
                requiredError && newTraining.youtubeURL === "" ? "error" : ""
              }
              onChange={e =>
                setNewTraining({
                  ...newTraining,
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
              placeholder="Tematicas"
              defaultValue={themesSelected}
              onChange={value => {
                setThemesSelected(value)
                const ids: number[] = []
                value.forEach(item => {
                  const filterItem = filterList.filter(
                    region => region.value === item,
                  )
                  if (filterItem.length > 0) {
                    ids.push(filterItem[0].id)
                  }
                })
                setNewTraining({
                  ...newTraining,
                  theme: ids,
                })
              }}
              options={filterList}
            />
          </div>
        </InputContainer>
      </Modal>
    </div>
  )
}

export default AddTraining
