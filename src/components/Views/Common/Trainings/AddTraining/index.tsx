import React, { useState, useContext } from "react"
import { TrainingsContext } from "contexts/Trainings"
import { createTraining } from "services/trainings/trainingActions.service"
import Modal from "components/UI/Modal"
import ModalStatus from "components/UI/ModalStatus"
import Button from "components/UI/Button"
import Input from "components/UI/Input"
import regionFilters from "const/regions"
import ComboBoxSelect from "components/UI/ComboBoxSelect"
import { OptionsInterface } from "interfaces/content/Article"
import { TrainingsInterface } from "interfaces/trainings/Trainings"
import { Container, ButtonContainer, InputContainer } from "./styles"

function AddTraining({
  closeModal,
  updateList,
}: {
  closeModal: (arg?: any) => void
  updateList: (arg?: any) => void
}) {
  const { themeFilters } = useContext(TrainingsContext)

  const [newTraining, setNewTraining] = useState<TrainingsInterface>({
    youtubeURL: "",
    title: "",
    author: "",
    description: "",
    theme: [],
    region: [],
  })
  const [requiredError, setRequiredError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const getActiveOptions = (
    idsSelected: number[],
    filters: { id: number; value: string }[],
  ): { id: number; value: string }[] => {
    const activeOptions = []

    for (let i = 0; i < filters.length; i += 1) {
      if (idsSelected.includes(filters[i].id)) {
        activeOptions.push(filters[i])
      }
    }

    return activeOptions
  }

  const createTrainingFuncion = async () => {
    // validar inputs
    if (
      newTraining.title !== "" &&
      newTraining.author !== "" &&
      newTraining.description !== "" &&
      newTraining.youtubeURL !== ""
    ) {
      setRequiredError(false)
      const createTrainingCall = await createTraining(newTraining)

      setSuccess(createTrainingCall.status === 201)
    } else {
      setRequiredError(true)
    }
  }

  return (
    <Modal>
      <Container>
        <h3>Crear capacitacion</h3>
        {requiredError && (
          <p className="required-error">
            *Completa todos los campos requeridos
          </p>
        )}
        {success && (
          <ModalStatus
            title="Excelente"
            description="La capacitacion se ha subido con exito"
            status="success"
            selfClose
            selfCloseAction={updateList}
          />
        )}
        <InputContainer>
          <div className="sub-container">
            <Input
              label="Titulo"
              required
              type="text"
              width={495}
              onChange={e =>
                setNewTraining({ ...newTraining, title: e.target.value })
              }
            />
          </div>
          <div className="sub-container">
            <Input
              label="Autor"
              required
              type="text"
              width={250}
              onChange={e =>
                setNewTraining({ ...newTraining, author: e.target.value })
              }
            />
            <Input
              label="Descripcion"
              required
              type="text"
              width={250}
              onChange={e =>
                setNewTraining({ ...newTraining, description: e.target.value })
              }
            />
          </div>
          <Input
            label="URL de YouTube"
            required
            type="text"
            width={495}
            onChange={e =>
              setNewTraining({
                ...newTraining,
                youtubeURL: e.target.value,
              })
            }
          />
          <div className="sub-container">
            <ComboBoxSelect
              placeholder="Region"
              optionsList="single"
              width={225}
              options={regionFilters}
              activeOptions={getActiveOptions(
                newTraining.region as number[],
                regionFilters,
              )}
              onChange={(e: OptionsInterface[] | undefined) => {
                if (e !== undefined) {
                  const filters: number[] = []
                  e.map(filter => filters.push(filter.id))
                  setNewTraining({
                    ...newTraining,
                    region: filters,
                  })
                }
              }}
            />
            <ComboBoxSelect
              placeholder="Tematica"
              optionsList="single"
              width={225}
              options={themeFilters}
              activeOptions={getActiveOptions(
                newTraining.theme as number[],
                themeFilters,
              )}
              onChange={(e: OptionsInterface[] | undefined) => {
                if (e !== undefined) {
                  const filters: number[] = []
                  e.map(filter => filters.push(filter.id))
                  setNewTraining({
                    ...newTraining,
                    theme: filters,
                  })
                }
              }}
            />
          </div>
        </InputContainer>
        <ButtonContainer>
          <Button content="Cancelar" cta={false} action={closeModal} />
          <Button content="Crear" cta action={createTrainingFuncion} />
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

export default AddTraining
