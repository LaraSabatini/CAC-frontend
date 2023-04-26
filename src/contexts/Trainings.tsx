import { createContext, useState, useMemo } from "react"
import { TrainingsInterface } from "interfaces/trainings/Trainings"
import { ArticleFiltersInterface } from "interfaces/content/Article"
import TrainingsContextInterface from "interfaces/contexts/TrainingsContextInterface"

export const TrainingsContext = createContext<TrainingsContextInterface>({
  trainingsList: [],
  setTrainingsList: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  themeFilters: [],
  setThemeFilters: () => {},
})

function TrainingsProvider({ children }: any) {
  const [trainingsList, setTrainingsList] = useState<TrainingsInterface[] | []>(
    [],
  )

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [themeFilters, setThemeFilters] = useState<
    ArticleFiltersInterface[] | []
  >([])

  const value: any = useMemo(
    () => ({
      trainingsList,
      setTrainingsList,
      currentPage,
      setCurrentPage,
      themeFilters,
      setThemeFilters,
    }),
    [trainingsList, currentPage, themeFilters],
  )

  return (
    <TrainingsContext.Provider value={value}>
      {children}
    </TrainingsContext.Provider>
  )
}

export default TrainingsProvider
