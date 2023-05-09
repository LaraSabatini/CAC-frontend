import React, { useContext, useEffect, useState } from "react"
import { ClientsContext } from "contexts/Clients"
import { getPlansForFilters } from "services/pricing/getPlans.service"
import { FilterInterface } from "interfaces/contexts/DashboardContextInterface"
import { filterClients } from "services/clients/clientActions.service"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import { Tooltip, Button, Checkbox } from "antd"
import Scroll from "components/UI/Scroll"
import regionFilters from "const/regions"

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
} from "./styles"

function Filters({ closeTab }: { closeTab: (arg?: any) => void }) {
  const {
    setClients,
    triggerListUpdate,
    setTriggerListUpdate,
    setClientSelected,
  } = useContext(ClientsContext)

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
    setClientSelected(null)
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

    if (getPlansForFiltersCall.status === 200) {
      const filterList: FilterInterface[] = []
      getPlansForFiltersCall.data.map((plan: { id: number; name: string }) =>
        filterList.push({
          id: plan.id,
          value: plan.name.split(" ")[1],
        }),
      )
      setPlanFilters(filterList)
    } else {
      setServerErrorModal(true)
    }
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
                      checked={regionFiltersSelected.indexOf(filter.id) !== -1}
                    >
                      {filter.value}
                    </Checkbox>
                  </Filter>
                ))}
              </Scroll>
            )}
          </SelectionContainer>
        </FilterSelector>

        <FilterSelector>
          <OpenFilters onClick={() => setPlanFilterOpen(!planFilterOpen)}>
            <Title>Plan</Title>
            {!planFilterOpen ? <CaretDownOutlined /> : <CaretUpOutlined />}
          </OpenFilters>
          <SelectionContainer>
            {planFilterOpen && (
              <Scroll height={150}>
                {planFilters.map(filter => (
                  <Filter key={filter.id}>
                    <Checkbox
                      onChange={() => {
                        selectFilter(filter.id, "plan")
                      }}
                      checked={planFiltersSelected.indexOf(filter.id) !== -1}
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
              setPlanFiltersSelected([])
              setTriggerListUpdate(triggerListUpdate + 1)
            }}
          >
            <Tooltip title="Limpiar">
              <DeleteOutlined />
            </Tooltip>
          </IconButton>

          <Button onClick={searchPartners} size="small" type="primary">
            Aplicar
          </Button>
        </ButtonContainer>
      </FilterList>
    </FilterContainer>
  )
}

export default Filters
