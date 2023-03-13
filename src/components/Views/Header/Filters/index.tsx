import React, { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { DashboardContext } from "contexts/Dashboard"
import Checkbox from "components/UI/Checkbox"
import Button from "components/UI/Button"
import {
  FilterContainer,
  FilterSelector,
  Title,
  OpenFilters,
  Filter,
  SelectionContainer,
  FilterList,
  ButtonContainer,
} from "./styles"

function Filters() {
  const router = useRouter()

  const { regionFilters, themeFilters } = useContext(DashboardContext)
  const [typeOfFilter, setTypeOfFilter] = useState<"articles" | "partners">(
    "articles",
  )
  const [regionFilterOpen, setRegionFilterOpen] = useState<boolean>(false)
  const [themeFilterOpen, setThemeFilterOpen] = useState<boolean>(false)

  const [regionFiltersSelected, setRegionFiltersSelected] = useState<number[]>(
    [],
  )
  const [themeFiltersSelected, setThemeFiltersSelected] = useState<number[]>([])

  const selectFilter = (id: number, type: "region" | "theme") => {
    if (type === "region") {
      const isSelected = regionFiltersSelected.indexOf(id)
      if (isSelected !== -1) {
        const newRegionFilters = regionFiltersSelected.filter(
          item => item !== id,
        )
        setRegionFiltersSelected(newRegionFilters)
      } else {
        const newRegionFilters = [...regionFiltersSelected, id]
        setRegionFiltersSelected(newRegionFilters)
      }
    } else {
      const isSelected = themeFiltersSelected.indexOf(id)
      if (isSelected !== -1) {
        const newThemeFilters = themeFiltersSelected.filter(item => item !== id)
        setThemeFiltersSelected(newThemeFilters)
      } else {
        const newThemeFilters = [...themeFiltersSelected, id]
        setThemeFiltersSelected(newThemeFilters)
      }
    }
  }

  useEffect(() => {
    if (router.asPath === "/dashboard") {
      setTypeOfFilter("articles")
    } else if (router.asPath === "/partners") {
      setTypeOfFilter("partners")
    }
  }, [router.asPath])

  return (
    <FilterContainer>
      {typeOfFilter === "articles" ? (
        <FilterList>
          <FilterSelector>
            <OpenFilters onClick={() => setRegionFilterOpen(!regionFilterOpen)}>
              <Title>Region</Title>
              {!regionFilterOpen ? <BsChevronDown /> : <BsChevronUp />}
            </OpenFilters>
            <SelectionContainer>
              {regionFilterOpen &&
                regionFilters.map(filter => (
                  <Filter>
                    <Checkbox
                      idParam={filter.value}
                      ownState
                      onChange={() => selectFilter(filter.id, "region")}
                      checked={regionFiltersSelected.indexOf(filter.id) !== -1}
                    />
                    {filter.value}
                  </Filter>
                ))}
            </SelectionContainer>
          </FilterSelector>
          <FilterSelector>
            <OpenFilters onClick={() => setThemeFilterOpen(!themeFilterOpen)}>
              <Title>Tematica</Title>
              {!themeFilterOpen ? <BsChevronDown /> : <BsChevronUp />}
            </OpenFilters>
            <SelectionContainer>
              {themeFilterOpen &&
                themeFilters.map(filter => (
                  <Filter>
                    <Checkbox
                      idParam={filter.value}
                      ownState
                      onChange={() => selectFilter(filter.id, "theme")}
                      checked={themeFiltersSelected.indexOf(filter.id) !== -1}
                    />
                    {filter.value}
                  </Filter>
                ))}
            </SelectionContainer>
          </FilterSelector>
          <ButtonContainer>
            <Button
              content="Limpiar"
              cta={false}
              action={() => {
                setRegionFiltersSelected([])
                setThemeFiltersSelected([])
              }}
            />
            <Button content="Aplicar" cta action={() => console.log("apply")} />
          </ButtonContainer>
        </FilterList>
      ) : (
        "socios"
      )}
    </FilterContainer>
  )
}

export default Filters
