import React, { useContext, useEffect, useState } from "react"
import { AiFillSave } from "react-icons/ai"
import { BsFillTrashFill, BsChevronDown, BsChevronUp } from "react-icons/bs"
import { ClientsContext } from "contexts/Clients"
import { getPlansForFilters } from "services/pricing/getPlans.service"
import { FilterInterface } from "interfaces/contexts/DashboardContextInterface"
import { filterClients } from "services/clients/clientActions.service"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import Checkbox from "components/UI/Checkbox"
import Tooltip from "components/UI/Tooltip"
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
  const { setClients } = useContext(ClientsContext)

  const [regionFilterOpen, setRegionFilterOpen] = useState<boolean>(false)
  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const [planFilterOpen, setPlanFilterOpen] = useState<boolean>(false)
  const [planFilters, setPlanFilters] = useState<FilterInterface[] | []>([])

  const [regionFiltersSelected, setRegionFiltersSelected] = useState<number[]>(
    [],
  )

  const [planFiltersSelected, setPlanFiltersSelected] = useState<number[]>([])

  const selectFilter = (id: number, type: "region" | "plan") => {
    let isSelected
    let filterSelected

    if (type === "region") {
      filterSelected = regionFiltersSelected
      isSelected = regionFiltersSelected.indexOf(id)
    } else {
      filterSelected = planFiltersSelected
      isSelected = planFiltersSelected.indexOf(id)
    }

    //
    if (isSelected !== -1) {
      const newFilters = filterSelected.filter(item => item !== id)
      if (type === "region") {
        setRegionFiltersSelected(newFilters)
      } else {
        setPlanFiltersSelected(newFilters)
      }
    } else {
      const newFilters = [...filterSelected, id]
      if (type === "region") {
        setRegionFiltersSelected(newFilters)
      } else {
        setPlanFiltersSelected(newFilters)
      }
    }
  }

  const searchPartners = async () => {
    closeTab()
    if (regionFiltersSelected.length || planFiltersSelected.length) {
      const filterClientsCall = await filterClients({
        regionIds: regionFiltersSelected,
        planIds: planFiltersSelected,
      })

      if (filterClientsCall.status === 200) {
        setClients(filterClientsCall.data)
      } else {
        setServerErrorModal(true)
      }
    }
  }

  const getPlanFilters = async () => {
    const getPlansForFiltersCall = await getPlansForFilters()
    const filterList: FilterInterface[] = []
    getPlansForFiltersCall.data.map((plan: { id: number; name: string }) =>
      filterList.push({
        id: plan.id,
        value: plan.name.split(" ")[1],
      }),
    )
    setPlanFilters(filterList)
  }

  useEffect(() => {
    if (!planFilters.length) {
      getPlanFilters()
    }
  }, [planFilters])

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
          <OpenFilters onClick={() => setPlanFilterOpen(!planFilterOpen)}>
            <Title>Plan</Title>
            {!planFilterOpen ? <BsChevronDown /> : <BsChevronUp />}
          </OpenFilters>
          <SelectionContainer>
            {planFilterOpen && (
              <Scroll height={100}>
                {planFilters.map(filter => (
                  <Filter key={filter.id}>
                    <Checkbox
                      idParam={filter.value}
                      ownState
                      onChange={() => selectFilter(filter.id, "plan")}
                      checked={planFiltersSelected.indexOf(filter.id) !== -1}
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
              setPlanFiltersSelected([])
            }}
          >
            <Tooltip title="Limpiar" placement="top-end">
              <BsFillTrashFill />
            </Tooltip>
          </IconButton>
          <IconButton type="button" onClick={searchPartners}>
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
