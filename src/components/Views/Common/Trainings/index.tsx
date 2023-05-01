import React, { useContext, useEffect, useState } from "react"
import { TrainingsContext } from "contexts/Trainings"
import {
  getTrainings,
  filterTrainings,
} from "@services/trainings/trainingActions.service"
import Header from "components/Views/Common/Header"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import removeDuplicates from "helpers/formatting/removeDuplicates"
import { filterList } from "const/filters"
import { SearchOutlined } from "@ant-design/icons"
import { Button } from "antd"
import AddTraining from "./AddTraining"
import TrainingCard from "./TrainingCard"
import {
  Container,
  Content,
  ButtonContainer,
  CardPlaceholder,
  FilterContainer,
  Filter,
  EmptyResults,
} from "./styles"

function TrainingsView() {
  const {
    currentPage,
    setTrainingsList,
    trainingsList,
    setCurrentPage,
  } = useContext(TrainingsContext)

  const [updateList, setUpdateList] = useState<number>(0)
  const [serverError, setServerError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [filtersSelected, setFiltersSelected] = useState<number[]>([])

  const getTrainingsData = async () => {
    if (filtersSelected.length === 0) {
      setLoading(true)
      const getTrainingsCall = await getTrainings(currentPage)
      if (getTrainingsCall.status === 200) {
        setLoading(false)

        if (trainingsList.length > 0) {
          const newList = removeDuplicates(
            trainingsList.concat(getTrainingsCall.data),
          )
          setTrainingsList(newList)
        } else {
          setTrainingsList(getTrainingsCall.data)
        }
      } else {
        setServerError(true)
      }
    } else {
      setLoading(true)
      const getTrainingsCall = await filterTrainings({
        themeIds: filtersSelected,
      })

      if (getTrainingsCall.status === 200) {
        setLoading(false)

        setTrainingsList(getTrainingsCall.data)
      } else {
        setServerError(true)
      }
    }
  }

  useEffect(() => {
    getTrainingsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, updateList, filtersSelected])

  const manageFilters = (filter: { id: number; value: string }) => {
    if (
      filtersSelected.length > 0 &&
      filtersSelected.indexOf(filter.id) !== -1
    ) {
      const filterTheme = filtersSelected.filter(item => item !== filter.id)
      setFiltersSelected(filterTheme)
    }

    if (
      filtersSelected.length === 0 ||
      filtersSelected.indexOf(filter.id) === -1
    ) {
      setFiltersSelected([...filtersSelected, filter.id])
    }
  }

  return (
    <>
      <Header />
      <Container>
        <InternalServerError
          visible={serverError}
          changeVisibility={() => setServerError(false)}
        />

        <AddTraining updateList={() => setUpdateList(updateList + 1)} />
        <FilterContainer>
          {filterList.map(theme => (
            <Filter
              onClick={() => manageFilters(theme)}
              selected={
                filtersSelected.length > 0 &&
                filtersSelected.indexOf(theme.id) !== -1
              }
            >
              {theme.value}
            </Filter>
          ))}
        </FilterContainer>
        {loading && (
          <Content>
            <CardPlaceholder />
            <CardPlaceholder />
            <CardPlaceholder />
            <CardPlaceholder />
            <CardPlaceholder />
            <CardPlaceholder />
          </Content>
        )}
        <Content>
          {trainingsList.length > 0 ? (
            trainingsList.map(training => (
              <TrainingCard
                key={training.id}
                id={training.id as number}
                youtubeURL={training.youtubeURL}
                title={training.title}
                description={training.description}
                author={training.author}
                theme={training.theme}
                region={training.region}
              />
            ))
          ) : (
            <EmptyResults>
              <SearchOutlined />
              <p>No hay resultados para tu busqueda</p>
            </EmptyResults>
          )}
        </Content>

        {trainingsList.length >= 25 && (
          <ButtonContainer>
            <Button
              type="primary"
              onClick={() => {
                setCurrentPage(currentPage + 1)
              }}
            >
              Cargar mas capacitaciones
            </Button>
          </ButtonContainer>
        )}
      </Container>
    </>
  )
}

export default TrainingsView
