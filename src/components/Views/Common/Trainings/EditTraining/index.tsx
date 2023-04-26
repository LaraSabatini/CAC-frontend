import React, { useState, useContext } from "react"
import { TrainingsContext } from "contexts/Trainings"
import { editTraining } from "services/trainings/trainingActions.service"
import Modal from "components/UI/Modal"
import ModalStatus from "components/UI/ModalStatus"
import Button from "components/UI/Button"
import Input from "components/UI/Input"
import regionFilters from "const/regions"
import ComboBoxSelect from "components/UI/ComboBoxSelect"
import { OptionsInterface } from "interfaces/content/Article"
import { TrainingsInterface } from "interfaces/trainings/Trainings"
import {
  Container,
  ButtonContainer,
  InputContainer,
} from "../AddTraining/styles"

function EditTraining({
  cancel,
  updateList,
  id,
  youtubeURL,
  title,
  description,
  author,
  theme,
  region,
}: {
  cancel: (arg?: any) => void
  id: number
  youtubeURL: string
  title: string
  description: string
  author: string
  theme: number[]
  region: number[]
  updateList: (arg?: any) => void
}) {
  const { themeFilters } = useContext(TrainingsContext)

  const [trainingEdited, setTrainingEdited] = useState<TrainingsInterface>({
    id,
    youtubeURL,
    title,
    author,
    description,
    theme,
    region,
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

  const editTrainingFuncion = async () => {
    // validar inputs
    if (
      trainingEdited.title !== "" &&
      trainingEdited.author !== "" &&
      trainingEdited.description !== "" &&
      trainingEdited.youtubeURL !== ""
    ) {
      setRequiredError(false)
      const editTrainingCall = await editTraining(trainingEdited)

      setSuccess(editTrainingCall.status === 201)
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
              value={trainingEdited.title}
              width={495}
              onChange={e =>
                setTrainingEdited({ ...trainingEdited, title: e.target.value })
              }
            />
          </div>
          <div className="sub-container">
            <Input
              label="Autor"
              required
              type="text"
              value={trainingEdited.author}
              width={250}
              onChange={e =>
                setTrainingEdited({ ...trainingEdited, author: e.target.value })
              }
            />
            <Input
              label="Descripcion"
              required
              type="text"
              value={trainingEdited.description}
              width={250}
              onChange={e =>
                setTrainingEdited({
                  ...trainingEdited,
                  description: e.target.value,
                })
              }
            />
          </div>
          <Input
            label="URL de YouTube"
            required
            type="text"
            value={trainingEdited.youtubeURL}
            width={495}
            onChange={e =>
              setTrainingEdited({
                ...trainingEdited,
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
                trainingEdited.region as number[],
                regionFilters,
              )}
              onChange={(e: OptionsInterface[] | undefined) => {
                if (e !== undefined) {
                  const filters: number[] = []
                  e.map(filter => filters.push(filter.id))
                  setTrainingEdited({
                    ...trainingEdited,
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
                trainingEdited.theme as number[],
                themeFilters,
              )}
              onChange={(e: OptionsInterface[] | undefined) => {
                if (e !== undefined) {
                  const filters: number[] = []
                  e.map(filter => filters.push(filter.id))
                  setTrainingEdited({
                    ...trainingEdited,
                    theme: filters,
                  })
                }
              }}
            />
          </div>
        </InputContainer>
        <ButtonContainer>
          <Button content="Cancelar" cta={false} action={cancel} />
          <Button content="Guardar cambios" cta action={editTrainingFuncion} />
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

export default EditTraining
