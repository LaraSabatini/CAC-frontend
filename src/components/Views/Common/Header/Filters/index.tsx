import React, { useContext, useState } from "react"
import { filterArticles } from "services/articles/articles.service"
import { DashboardContext } from "contexts/Dashboard"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import Scroll from "components/UI/Scroll"
import regionFilters from "const/regions"
import filterValues from "const/filters"
import { Checkbox, Button, Tooltip } from "antd"
import {
  DeleteOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons"
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
  SubFilters,
} from "./styles"

function Filters({ closeTab }: { closeTab: (arg?: any) => void }) {
  const {
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

  const filtersWithoutSubFilters = filterValues.filter(
    item => !item.subfilters.length,
  )
  const filtersWithSubFilters = filterValues.filter(
    item => item.subfilters.length > 0,
  )

  return (
    <FilterContainer>
      <InternalServerError
        visible={serverErrorModal}
        changeVisibility={() => setServerErrorModal(false)}
      />
      <FilterList>
        <FilterSelector>
          <OpenFilters onClick={() => setThemeFilterOpen(!themeFilterOpen)}>
            <Title>Temática</Title>
            {!themeFilterOpen ? <CaretDownOutlined /> : <CaretUpOutlined />}
          </OpenFilters>
          <SelectionContainer>
            {themeFilterOpen && (
              <Scroll height={180}>
                <>
                  {filtersWithoutSubFilters.map(filter => (
                    <Filter key={filter.id}>
                      <Checkbox
                        onChange={() => {
                          selectFilter(filter.id, "theme")
                        }}
                        checked={themeFiltersSelected.indexOf(filter.id) !== -1}
                      >
                        {filter.value}
                      </Checkbox>
                    </Filter>
                  ))}
                  {filtersWithSubFilters.map(filter => (
                    <Filter key={filter.id}>
                      {filter.value}
                      <SubFilters>
                        {filter.subfilters.map(subfilter => (
                          <Checkbox
                            onChange={() => {
                              selectFilter(subfilter.id, "theme")
                            }}
                            checked={
                              themeFiltersSelected.indexOf(subfilter.id) !== -1
                            }
                          >
                            {subfilter.value}
                          </Checkbox>
                        ))}
                      </SubFilters>
                    </Filter>
                  ))}
                </>
              </Scroll>
            )}
          </SelectionContainer>
        </FilterSelector>
        <FilterSelector>
          <OpenFilters onClick={() => setRegionFilterOpen(!regionFilterOpen)}>
            <Title>Región</Title>
            {!regionFilterOpen ? <CaretDownOutlined /> : <CaretUpOutlined />}
          </OpenFilters>
          <SelectionContainer>
            {regionFilterOpen && (
              <Scroll height={150}>
                {regionFilters.map(filter => (
                  <Filter key={filter.id}>
                    <Checkbox
                      onChange={() => {
                        selectFilter(filter.id, "region")
                      }}
                    >
                      {filter.value}
                    </Checkbox>
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
            <Tooltip title="Limpiar">
              <DeleteOutlined />
            </Tooltip>
          </IconButton>
          <Button onClick={searchArticles} size="small" type="primary">
            Aplicar
          </Button>
        </ButtonContainer>
      </FilterList>
    </FilterContainer>
  )
}

export default Filters
