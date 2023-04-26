import React, { useState, useEffect, useContext } from "react"
import {
  getAvailability,
  createAvailability,
  changeAvailability,
} from "services/advisories/advisories.service"
import { AdvisoriesContext } from "contexts/Advisories"
import ModalStatus from "components/UI/ModalStatus"
import Modal from "components/UI/Modal"
import ComboBoxSelect from "components/UI/ComboBoxSelect"
import { days, hours } from "const/dates"
import Button from "components/UI/Button"
import { Container, Title, SelectionContainer, Option } from "./styles"

function Availability({ closeModal }: { closeModal: (arg?: any) => void }) {
  const { setServerError } = useContext(AdvisoriesContext)

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const virginList = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  }

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const [availabilityId, setAvailabilityId] = useState<number>(0)

  const [availabilityList, setAvailabilityList] = useState<{
    sunday: number[]
    monday: number[]
    tuesday: number[]
    wednesday: number[]
    thursday: number[]
    friday: number[]
    saturday: number[]
  }>(virginList)

  const getAdminData = async () => {
    const getAvailabilityCall = await getAvailability(userData?.id)
    if (getAvailabilityCall.status === 200) {
      setAvailabilityList(
        !getAvailabilityCall.data.length
          ? virginList
          : JSON.parse(getAvailabilityCall.data[0].availability),
      )
      setIsEditing(getAvailabilityCall.data.length)
      setAvailabilityId(
        !getAvailabilityCall.data.length ? 0 : getAvailabilityCall.data[0].id,
      )
    } else {
      setServerError(true)
    }
  }

  useEffect(() => {
    getAdminData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getActiveOptions = (
    idsSelected: number[],
    filters: { id: number; value: string }[],
  ): { id: number; value: string }[] => {
    const activeOptions = []

    for (let i = 0; i < filters.length; i += 1) {
      if (idsSelected.includes(filters[i].id)) {
        activeOptions.push(filters[i])
      }
    }

    return activeOptions
  }

  const saveAvailability = async () => {
    if (isEditing) {
      const changeAvailabilityCall = await changeAvailability({
        id: availabilityId,
        adminId: userData?.id,
        availability: JSON.stringify(availabilityList),
      })
      setSuccess(changeAvailabilityCall.status === 201)
      setServerError(changeAvailabilityCall.status !== 201)
    } else {
      const createAvailabilityCall = await createAvailability({
        adminId: userData?.id,
        availability: JSON.stringify(availabilityList),
      })
      setSuccess(createAvailabilityCall.status === 201)
      setServerError(createAvailabilityCall.status !== 201)
    }
  }

  return (
    <Modal>
      <Container>
        {success && (
          <ModalStatus
            title="Excelente"
            description="La disponibilidad ha sido guardada con exito"
            status="success"
            selfClose
            selfCloseAction={closeModal}
          />
        )}

        <Title>Agregar o modificar disponibilidad horaria</Title>
        <SelectionContainer key={days[0].id}>
          <Option>{days[0].name}</Option>
          <ComboBoxSelect
            width={400}
            optionsList="single"
            options={hours}
            activeOptions={getActiveOptions(
              availabilityList.sunday as number[],
              hours,
            )}
            onChange={(e: any) => {
              const filterActualList = availabilityList.sunday.filter(
                id => id === 111,
              )
              const filterResponse = e.filter(
                (item: { id: number; value: string }) => item.id === 111,
              )

              // si se selecciono el 11
              if (!filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                hours.map(hour => allIds.push(hour.id))
                setAvailabilityList({ ...availabilityList, sunday: allIds })
              }

              if (filterActualList.length && !filterResponse.length) {
                setAvailabilityList({ ...availabilityList, sunday: [] })
              }

              if (filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                const index = allIds.indexOf(111)
                allIds.splice(index, 1)
                setAvailabilityList({
                  ...availabilityList,
                  sunday: allIds,
                })
              }

              if (!filterActualList.length && !filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                setAvailabilityList({
                  ...availabilityList,
                  sunday: allIds,
                })
              }
            }}
          />
        </SelectionContainer>

        <SelectionContainer key={days[1].id}>
          <Option>{days[1].name}</Option>
          <ComboBoxSelect
            width={400}
            optionsList="single"
            options={hours}
            activeOptions={getActiveOptions(
              availabilityList.monday as number[],
              hours,
            )}
            onChange={(e: any) => {
              const filterActualList = availabilityList.monday.filter(
                id => id === 111,
              )
              const filterResponse = e.filter(
                (item: { id: number; value: string }) => item.id === 111,
              )

              if (!filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                hours.map(hour => allIds.push(hour.id))
                setAvailabilityList({ ...availabilityList, monday: allIds })
              }

              if (filterActualList.length && !filterResponse.length) {
                setAvailabilityList({ ...availabilityList, monday: [] })
              }

              if (filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                const index = allIds.indexOf(111)
                allIds.splice(index, 1)
                setAvailabilityList({
                  ...availabilityList,
                  monday: allIds,
                })
              }
              if (!filterActualList.length && !filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                setAvailabilityList({
                  ...availabilityList,
                  monday: allIds,
                })
              }
            }}
          />
        </SelectionContainer>

        <SelectionContainer key={days[2].id}>
          <Option>{days[2].name}</Option>
          <ComboBoxSelect
            width={400}
            optionsList="single"
            options={hours}
            activeOptions={getActiveOptions(
              availabilityList.tuesday as number[],
              hours,
            )}
            onChange={(e: any) => {
              const filterActualList = availabilityList.tuesday.filter(
                id => id === 111,
              )
              const filterResponse = e.filter(
                (item: { id: number; value: string }) => item.id === 111,
              )

              if (!filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                hours.map(hour => allIds.push(hour.id))
                setAvailabilityList({ ...availabilityList, tuesday: allIds })
              }

              if (filterActualList.length && !filterResponse.length) {
                setAvailabilityList({ ...availabilityList, tuesday: [] })
              }

              if (filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                const index = allIds.indexOf(111)
                allIds.splice(index, 1)
                setAvailabilityList({
                  ...availabilityList,
                  tuesday: allIds,
                })
              }
              if (!filterActualList.length && !filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                setAvailabilityList({
                  ...availabilityList,
                  tuesday: allIds,
                })
              }
            }}
          />
        </SelectionContainer>
        <SelectionContainer key={days[3].id}>
          <Option>{days[3].name}</Option>
          <ComboBoxSelect
            width={400}
            optionsList="single"
            options={hours}
            activeOptions={getActiveOptions(
              availabilityList.wednesday as number[],
              hours,
            )}
            onChange={(e: any) => {
              const filterActualList = availabilityList.wednesday.filter(
                id => id === 111,
              )
              const filterResponse = e.filter(
                (item: { id: number; value: string }) => item.id === 111,
              )

              if (!filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                hours.map(hour => allIds.push(hour.id))
                setAvailabilityList({ ...availabilityList, wednesday: allIds })
              }

              if (filterActualList.length && !filterResponse.length) {
                setAvailabilityList({ ...availabilityList, wednesday: [] })
              }

              if (filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                const index = allIds.indexOf(111)
                allIds.splice(index, 1)
                setAvailabilityList({
                  ...availabilityList,
                  wednesday: allIds,
                })
              }
              if (!filterActualList.length && !filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                setAvailabilityList({
                  ...availabilityList,
                  wednesday: allIds,
                })
              }
            }}
          />
        </SelectionContainer>
        <SelectionContainer key={days[4].id}>
          <Option>{days[4].name}</Option>
          <ComboBoxSelect
            width={400}
            optionsList="single"
            options={hours}
            activeOptions={getActiveOptions(
              availabilityList.thursday as number[],
              hours,
            )}
            onChange={(e: any) => {
              const filterActualList = availabilityList.thursday.filter(
                id => id === 111,
              )
              const filterResponse = e.filter(
                (item: { id: number; value: string }) => item.id === 111,
              )

              if (!filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                hours.map(hour => allIds.push(hour.id))
                setAvailabilityList({ ...availabilityList, thursday: allIds })
              }

              if (filterActualList.length && !filterResponse.length) {
                setAvailabilityList({ ...availabilityList, thursday: [] })
              }

              if (filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                const index = allIds.indexOf(111)
                allIds.splice(index, 1)
                setAvailabilityList({
                  ...availabilityList,
                  thursday: allIds,
                })
              }
              if (!filterActualList.length && !filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                setAvailabilityList({
                  ...availabilityList,
                  thursday: allIds,
                })
              }
            }}
          />
        </SelectionContainer>
        <SelectionContainer key={days[5].id}>
          <Option>{days[5].name}</Option>
          <ComboBoxSelect
            width={400}
            optionsList="single"
            options={hours}
            activeOptions={getActiveOptions(
              availabilityList.friday as number[],
              hours,
            )}
            onChange={(e: any) => {
              const filterActualList = availabilityList.friday.filter(
                id => id === 111,
              )
              const filterResponse = e.filter(
                (item: { id: number; value: string }) => item.id === 111,
              )

              if (!filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                hours.map(hour => allIds.push(hour.id))
                setAvailabilityList({ ...availabilityList, friday: allIds })
              }

              if (filterActualList.length && !filterResponse.length) {
                setAvailabilityList({ ...availabilityList, friday: [] })
              }

              if (filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                const index = allIds.indexOf(111)
                allIds.splice(index, 1)
                setAvailabilityList({
                  ...availabilityList,
                  friday: allIds,
                })
              }
              if (!filterActualList.length && !filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                setAvailabilityList({
                  ...availabilityList,
                  friday: allIds,
                })
              }
            }}
          />
        </SelectionContainer>
        <SelectionContainer key={days[6].id}>
          <Option>{days[6].name}</Option>
          <ComboBoxSelect
            width={400}
            optionsList="single"
            options={hours}
            activeOptions={getActiveOptions(
              availabilityList.saturday as number[],
              hours,
            )}
            onChange={(e: any) => {
              const filterActualList = availabilityList.saturday.filter(
                id => id === 111,
              )
              const filterResponse = e.filter(
                (item: { id: number; value: string }) => item.id === 111,
              )

              if (!filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                hours.map(hour => allIds.push(hour.id))
                setAvailabilityList({ ...availabilityList, saturday: allIds })
              }

              if (filterActualList.length && !filterResponse.length) {
                setAvailabilityList({ ...availabilityList, saturday: [] })
              }

              if (filterActualList.length && filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                const index = allIds.indexOf(111)
                allIds.splice(index, 1)
                setAvailabilityList({
                  ...availabilityList,
                  saturday: allIds,
                })
              }
              if (!filterActualList.length && !filterResponse.length) {
                const allIds: number[] = []
                e.map((item: { id: number; value: string }) =>
                  allIds.push(item.id),
                )
                setAvailabilityList({
                  ...availabilityList,
                  saturday: allIds,
                })
              }
            }}
          />
        </SelectionContainer>
        <SelectionContainer>
          <Button content="Cancelar cambios" cta={false} action={closeModal} />
          <Button content="Guardar cambios" cta action={saveAvailability} />
        </SelectionContainer>
      </Container>
    </Modal>
  )
}

export default Availability
