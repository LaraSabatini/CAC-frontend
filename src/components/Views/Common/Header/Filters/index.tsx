import React, { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { filterArticles } from "services/articles/articles.service"
import { DashboardContext } from "contexts/Dashboard"
import Checkbox from "components/UI/Checkbox"
import Button from "components/UI/Button"
import Scroll from "components/UI/Scroll"
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

function Filters({ closeTab }: { closeTab: (arg?: any) => void }) {
  const router = useRouter()

  const regionFilters: { id: number; value: string }[] = JSON.parse(
    localStorage.getItem("regions") as string,
  )

  const {
    themeFilters,
    setArticles,
    setTriggerArticleListUpdate,
    triggerArticleListUpdate,
  } = useContext(DashboardContext)

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
    const isSelected =
      type === "region"
        ? regionFiltersSelected.indexOf(id)
        : themeFiltersSelected.indexOf(id)
    const filterSelected =
      type === "region" ? regionFiltersSelected : themeFiltersSelected
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

      setArticles(filterArticlesCall.data)
    } else {
      setTriggerArticleListUpdate(triggerArticleListUpdate + 1)
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
              {regionFilterOpen && (
                <Scroll height={150}>
                  {regionFilters.map(filter => (
                    <Filter key={filter.id}>
                      <Checkbox
                        idParam={filter.value}
                        ownState
                        onChange={() => selectFilter(filter.id, "region")}
                        checked={
                          regionFiltersSelected.indexOf(filter.id) !== -1
                        }
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
            <Button
              content="Limpiar"
              cta={false}
              action={() => {
                closeTab()
                setRegionFiltersSelected([])
                setThemeFiltersSelected([])
                setTriggerArticleListUpdate(triggerArticleListUpdate + 1)
              }}
            />
            <Button content="Aplicar" cta action={searchArticles} />
          </ButtonContainer>
        </FilterList>
      ) : (
        "socios"
      )}
    </FilterContainer>
  )
}

export default Filters
