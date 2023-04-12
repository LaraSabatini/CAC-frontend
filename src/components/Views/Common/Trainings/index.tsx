import React, { useContext, useEffect, useState } from "react"
import { getFilters } from "services/articles/filters.service"
import { TrainingsContext } from "contexts/Trainings"
import { AiOutlineVideoCameraAdd } from "react-icons/ai"
import { getTrainings } from "@services/trainings/trainingActions.service"
import Header from "components/Views/Common/Header"
import Tooltip from "components/UI/Tooltip"
import TrainingCard from "./TrainingCard"
import AddTraining from "./AddTraining"
import { Container, Content, CreateTraining } from "./styles"

function TrainingsView() {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const {
    currentPage,
    setTrainingsList,
    trainingsList,
    setThemeFilters,
  } = useContext(TrainingsContext)

  const [openModal, setOpenModal] = useState<boolean>()
  const [updateList, setUpdateList] = useState<number>(0)

  const getTrainingsData = async () => {
    const getTrainingsCall = await getTrainings(currentPage)
    setTrainingsList(getTrainingsCall.data)
  }

  const getThemeFilters = async () => {
    const getFiltersCall = await getFilters()
    setThemeFilters(getFiltersCall.data)
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
          {trainingsList.length &&
            trainingsList.map(training => (
              <TrainingCard
                key={training.id}
                youtubeURL={training.youtubeURL}
                title={training.title}
                description={training.description}
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
      </Container>
    </>
  )
}

export default TrainingsView
