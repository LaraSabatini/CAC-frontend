import React, { useContext, useState } from "react"
import { AiFillSave } from "react-icons/ai"
import { BsFillTrashFill, BsChevronDown, BsChevronUp } from "react-icons/bs"
import { filterArticles } from "services/articles/articles.service"
import { DashboardContext } from "contexts/Dashboard"
import Checkbox from "components/UI/Checkbox"
import Tooltip from "components/UI/Tooltip"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import Scroll from "components/UI/Scroll"
import regionFilters from "const/regions"
import {
  FilterContainer,
  FilterSelector,
  Title,
  OpenFilters,
  Filter,
  SelectionContainer,
  FilterList,
  ButtonContainer,
  IconButton,
} from "./styles"

function Filters({ closeTab }: { closeTab: (arg?: any) => void }) {
  const {
    themeFilters,
    setArticles,
    setTriggerArticleListUpdate,
    triggerArticleListUpdate,
  } = useContext(DashboardContext)

  const [regionFilterOpen, setRegionFilterOpen] = useState<boolean>(false)
  const [themeFilterOpen, setThemeFilterOpen] = useState<boolean>(false)

  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const [regionFiltersSelected, setRegionFiltersSelected] = useState<number[]>(
    [],
  )
  const [themeFiltersSelected, setThemeFiltersSelected] = useState<number[]>([])

  const selectFilter = (id: number, type: "region" | "theme" | "plan") => {
    let isSelected
    let filterSelected

    if (type === "region") {
      filterSelected = regionFiltersSelected
      isSelected = regionFiltersSelected.indexOf(id)
    } else {
      filterSelected = themeFiltersSelected
      isSelected = themeFiltersSelected.indexOf(id)
    }

    //
    if (isSelected !== -1) {
      const newFilters = filterSelected.filter(item => item !== id)
      if (type === "region") {
        setRegionFiltersSelected(newFilters)
      } else {
        setThemeFiltersSelected(newFilters)
      }
    } else {
      const newFilters = [...filterSelected, id]
      if (type === "region") {
        setRegionFiltersSelected(newFilters)
      } else {
        setThemeFiltersSelected(newFilters)
      }
    }
  }

  const searchArticles = async () => {
    closeTab()
    if (regionFiltersSelected.length || themeFiltersSelected.length) {
      const filterArticlesCall = await filterArticles({
        regionIds: regionFiltersSelected,
        themeIds: themeFiltersSelected,
      })
      if (filterArticlesCall.status === 200) {
        setArticles(filterArticlesCall.data)
      } else {
        setServerErrorModal(true)
      }
    } else {
      setTriggerArticleListUpdate(triggerArticleListUpdate + 1)
    }
  }

  return (
    <FilterContainer>
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      <FilterList>
        <FilterSelector>
          <OpenFilters onClick={() => setRegionFilterOpen(!regionFilterOpen)}>
            <Title>Region</Title>
            {!regionFilterOpen ? <BsChevronDown /> : <BsChevronUp />}
          </OpenFilters>
          <SelectionContainer>
            {regionFilterOpen && (
              <Scroll height={150}>
                {regionFilters.map(filter => (
                  <Filter key={filter.id}>
                    <Checkbox
                      idParam={filter.value}
                      ownState
                      onChange={() => {
                        selectFilter(filter.id, "region")
                      }}
                      checked={regionFiltersSelected.indexOf(filter.id) !== -1}
                    />
                    {filter.value}
                  </Filter>
                ))}
              </Scroll>
            )}
          </SelectionContainer>
        </FilterSelector>
        <FilterSelector>
          <OpenFilters onClick={() => setThemeFilterOpen(!themeFilterOpen)}>
            <Title>Tematica</Title>
            {!themeFilterOpen ? <BsChevronDown /> : <BsChevronUp />}
          </OpenFilters>
          <SelectionContainer>
            {themeFilterOpen && (
              <Scroll height={100}>
                {themeFilters.map(filter => (
                  <Filter key={filter.id}>
                    <Checkbox
                      idParam={filter.value}
                      ownState
                      onChange={() => selectFilter(filter.id, "theme")}
                      checked={themeFiltersSelected.indexOf(filter.id) !== -1}
                    />
                    {filter.value}
                  </Filter>
                ))}
              </Scroll>
            )}
          </SelectionContainer>
        </FilterSelector>

        <ButtonContainer>
          <IconButton
            type="button"
            onClick={() => {
              closeTab()
              setRegionFiltersSelected([])
              setThemeFiltersSelected([])
              setTriggerArticleListUpdate(triggerArticleListUpdate + 1)
            }}
          >
            <Tooltip title="Limpiar" placement="top-end">
              <BsFillTrashFill />
            </Tooltip>
          </IconButton>
          <IconButton type="button" onClick={searchArticles}>
            <Tooltip title="Aplicar" placement="top-end">
              <AiFillSave />
            </Tooltip>
          </IconButton>
        </ButtonContainer>
      </FilterList>
    </FilterContainer>
  )
}

export default Filters
