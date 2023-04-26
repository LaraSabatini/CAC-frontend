import React, { useContext, useEffect, useState } from "react"
import { getFilters } from "services/articles/filters.service"
import { TrainingsContext } from "contexts/Trainings"
import { AiOutlineVideoCameraAdd } from "react-icons/ai"
import { getTrainings } from "@services/trainings/trainingActions.service"
import Header from "components/Views/Common/Header"
import Button from "components/UI/Button"
import Tooltip from "components/UI/Tooltip"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import TrainingCard from "./TrainingCard"
import AddTraining from "./AddTraining"
import { Container, Content, CreateTraining, ButtonContainer } from "./styles"

function TrainingsView() {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const {
    currentPage,
    setTrainingsList,
    trainingsList,
    setThemeFilters,
    setCurrentPage,
  } = useContext(TrainingsContext)

  const [openModal, setOpenModal] = useState<boolean>()
  const [updateList, setUpdateList] = useState<number>(0)
  const [serverError, setServerError] = useState<boolean>(false)

  const getTrainingsData = async () => {
    const getTrainingsCall = await getTrainings(currentPage)

    if (getTrainingsCall.status === 200) {
      if (trainingsList.length > 0) {
        setTrainingsList(trainingsList.concat(getTrainingsCall.data))
      } else {
        setTrainingsList(getTrainingsCall.data)
      }
    } else {
      setServerError(true)
    }
  }

  const getThemeFilters = async () => {
    const getFiltersCall = await getFilters()
    if (getFiltersCall.status === 200) {
      setThemeFilters(getFiltersCall.data)
    } else {
      setServerError(true)
    }
  }

  useEffect(() => {
    getTrainingsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, updateList])

  useEffect(() => {
    getThemeFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <Container>
        <InternalServerError
          visible={serverError}
          changeVisibility={() => setServerError(false)}
        />
        <div className="container-head">
          <h3>Capacitaciones</h3>
          {userData?.type === "admin" && (
            <CreateTraining type="button" onClick={() => setOpenModal(true)}>
              <Tooltip title="Agregar capacitacion">
                <AiOutlineVideoCameraAdd />
              </Tooltip>
            </CreateTraining>
          )}
        </div>
        <Content>
          {trainingsList.length > 0 &&
            trainingsList.map(training => (
              <TrainingCard
                key={training.id}
                id={training.id as number}
                youtubeURL={training.youtubeURL}
                title={training.title}
                description={training.description}
                updateList={() => setUpdateList(updateList + 1)}
                author={training.author}
                theme={training.theme}
                region={training.region}
              />
            ))}
        </Content>
        {openModal && (
          <AddTraining
            closeModal={() => setOpenModal(false)}
            updateList={() => {
              setOpenModal(false)
              setUpdateList(updateList + 1)
            }}
          />
        )}
        {trainingsList.length >= 25 && (
          <ButtonContainer>
            <Button
              content="Cargar mas capacitaciones"
              cta
              action={() => {
                setCurrentPage(currentPage + 1)
              }}
            />
          </ButtonContainer>
        )}
      </Container>
    </>
  )
}

export default TrainingsView
