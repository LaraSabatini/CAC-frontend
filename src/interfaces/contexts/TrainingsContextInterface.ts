import { TrainingsInterface } from "interfaces/trainings/Trainings"
import { ArticleFiltersInterface } from "interfaces/content/Article"

interface TrainingsContextInterface {
  trainingsList: TrainingsInterface[]
  setTrainingsList(trainingsList: TrainingsInterface[]): void
  currentPage: number
  setCurrentPage(currentPage: number): void
  themeFilters: ArticleFiltersInterface[] | []
  setThemeFilters(themeFilters: ArticleFiltersInterface[] | []): void
}
export default TrainingsContextInterface
