import React, { useState, useContext } from "react"
import { listHours, keysOfDays, keysOfDaysSpa } from "const/dates"
import { AdvisoriesContext } from "contexts/Advisories"
import getNextSevenDates from "helpers/dates/getNextSixDays"
import { AdvisoryInterface } from "interfaces/content/Advisories"
import { Input, Select, Button, Modal } from "antd"
import {
  getAvailability,
  getAdvisoriesByMonthAndAdmin,
  requestAdvisory,
} from "services/advisories/advisories.service"

function SearchByAdmin({
  adminListForSelect,
  close,
}: {
  adminListForSelect: { id: number; value: string }[]
  close: (arg?: any) => void
}) {
  const { setServerError } = useContext(AdvisoriesContext)

  const userData = JSON.parse(localStorage.getItem("userData") as string)
  const { TextArea } = Input

  const [disableRequestButton, setDisableRequestButton] = useState<boolean>(
    true,
  )
  const [loadingReq, setLoadingReq] = useState<boolean>(false)
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false)
  const [canRequest, setCanRequest] = useState<boolean>(false)

  const [adminSelected, setAdminSelected] = useState<{
    id: number
    value: string
  }>(adminListForSelect[0])

  const [requiredFiledsError, setRequiredFiledsError] = useState<boolean>(false)

  const [availableDays, setAvailableDays] = useState<
    { id: number; name: string; day: string; hours: number[] }[]
  >()

  const [availableDaysList, setAvailableDaysList] = useState<
    { id: number; value: string }[]
  >()

  const [brief, setBrief] = useState<string>("")

  const [daySelected, setDaySelected] = useState<{
    id: number
    value: string
  }>()
  const [hourSelected, setHourSelected] = useState<{
    id: number
    value: string
  }>()

  const [availableHoursList, setAvailableHoursList] = useState<
    { id: number; value: string }[]
  >()

  const searchAvailabilityAdmin = async () => {
    setCanRequest(true)
    setLoadingSearch(true)
    if (adminSelected !== undefined) {
      const today = new Date()
      const days: string[] = getNextSevenDates(today)

      const getAvailabilityCall = await getAvailability(adminSelected.id)

      if (getAvailabilityCall.status === 200) {
        const getAdvisoriesByMonthAndAdminCall = await getAdvisoriesByMonthAndAdmin(
          today.getMonth() + 1,
          adminSelected.id,
        )

        const daysForList: {
          id: number
          name: string
          day: string
          hours: number[]
        }[] = []
        const parseAvailability = JSON.parse(
          getAvailabilityCall.data[0].availability as string,
        )

        days.forEach(day => {
          const splitDate = day.split("/")
          const date = new Date(
            `${splitDate[2]}-${splitDate[1]}/${splitDate[0]}`,
          )

          const dayName: any = keysOfDays[date.getDay()].value

          daysForList.push({
            id: keysOfDaysSpa[date.getDay()].id,
            name: keysOfDaysSpa[date.getDay()].value,
            day,
            hours: parseAvailability[dayName],
          })
        })

        const leaveOnlyDaysWithHours = daysForList.filter(
          day => day.hours.length > 0,
        )

        if (getAdvisoriesByMonthAndAdminCall.status === 200) {
          const adminAgenda = getAdvisoriesByMonthAndAdminCall.data
          if (adminAgenda.length > 0) {
            const daysToRemoveAvailability: AdvisoryInterface[] = []
            leaveOnlyDaysWithHours.forEach(
              (day: {
                id: number
                name: string
                day: string
                hours: number[]
              }) => {
                const filterAgenda = adminAgenda.filter(
                  (advisory: AdvisoryInterface) =>
                    advisory.date === day.day.replaceAll("/", "-"),
                )

                for (let i = 0; i < filterAgenda.length; i += 1) {
                  daysToRemoveAvailability.push(filterAgenda[i])
                }
              },
            )

            if (daysToRemoveAvailability.length) {
              const dayAndHourIdentifiers: {
                day: string
                hours: number[]
              }[] = []

              for (let i = 0; i < daysToRemoveAvailability.length; i += 1) {
                const filterArray = dayAndHourIdentifiers.filter(
                  dayAndHour =>
                    dayAndHour.day === daysToRemoveAvailability[i].date,
                )

                if (filterArray.length) {
                  const index = dayAndHourIdentifiers.findIndex(
                    dayAndHour => dayAndHour === filterArray[0],
                  )

                  dayAndHourIdentifiers[index].hours.push(
                    listHours.filter(
                      hour => hour.value === daysToRemoveAvailability[i].hour,
                    )[0].id,
                  )
                } else {
                  dayAndHourIdentifiers.push({
                    day: daysToRemoveAvailability[i].date,
                    hours: [
                      listHours.filter(
                        hour => hour.value === daysToRemoveAvailability[i].hour,
                      )[0].id,
                    ],
                  })
                }
              }

              const indexOfDatesToEdit: number[] = []

              for (let i = 0; i < dayAndHourIdentifiers.length; i += 1) {
                const filterLeaveOnlyDaysWithHours = leaveOnlyDaysWithHours.filter(
                  day =>
                    day.day.replaceAll("/", "-") ===
                    dayAndHourIdentifiers[i].day,
                )

                const indexOfDate = leaveOnlyDaysWithHours.findIndex(
                  date => date === filterLeaveOnlyDaysWithHours[0],
                )
                indexOfDatesToEdit.push(indexOfDate)

                for (
                  let a = 0;
                  a < dayAndHourIdentifiers[i].hours.length;
                  a += 1
                ) {
                  const indexOfId = filterLeaveOnlyDaysWithHours[0].hours.findIndex(
                    hola => hola === dayAndHourIdentifiers[i].hours[a],
                  )
                  filterLeaveOnlyDaysWithHours[0].hours.splice(indexOfId, 1)
                }
              }
            }
          }
        } else {
          setServerError(true)
        }

        setAvailableDays(leaveOnlyDaysWithHours)

        const otherList: { id: number; value: string }[] = []

        leaveOnlyDaysWithHours?.forEach(day =>
          otherList.push({
            id: day.id,
            value: `${day.name} - ${day.day}`,
          }),
        )

        setAvailableDaysList(otherList)

        const newList: { id: number; value: string }[] = []

        const { hours } = leaveOnlyDaysWithHours[0]
        hours.forEach(hour =>
          newList.push(listHours.filter(item => item.id === hour)[0]),
        )
        setAvailableHoursList(newList)
        setLoadingSearch(false)
      } else {
        setServerError(true)
      }
    }
  }

  const success = () => {
    Modal.success({
      title: "¡Excelente!",
      content: "Tu solicitud se ha enviado con éxito",
      onOk() {
        close()
      },
    })
  }

  const requestAdvisoryCall = async () => {
    if (daySelected !== undefined && hourSelected !== undefined) {
      setLoadingReq(true)
      const date: string[] = daySelected.value.split("-")

      const requestAdvisoryData: AdvisoryInterface = {
        adminId: adminSelected?.id as number,
        clientId: userData.id as number,
        date: date[1].trim().replaceAll("/", "-"),
        hour: hourSelected.value,
        month: parseInt(date[1].trim().split("/")[1], 10),
        brief,
        eventURL: "",
        status: "pending",
      }

      const requestAdvisoryReq = await requestAdvisory(requestAdvisoryData)
      if (requestAdvisoryReq.status === 201) {
        setLoadingReq(false)
        success()
      } else {
        setServerError(true)
      }
    }
  }

  return (
    <div>
      {requiredFiledsError && (
        <p style={{ color: "#c12929" }} className="req-fields">
          *Completa los campos requeridos
        </p>
      )}

      <div style={{ paddingTop: "15px" }}>
        <Select
          placeholder="Seleccionar asesor"
          defaultValue={adminSelected.value}
          style={{ width: 350 }}
          onChange={value => {
            setDisableRequestButton(true)
            const filterAdmins = adminListForSelect.filter(
              admin => admin.value === value,
            )
            setAdminSelected(filterAdmins[0])
            setAvailableDays(undefined)
            setAvailableDaysList(undefined)
          }}
          options={adminListForSelect}
        />
      </div>

      {availableDays !== undefined && availableDaysList !== undefined && (
        <div>
          <div
            className="sub-container"
            style={{
              paddingTop: "15px",
              display: "flex",
              gap: "10px",
            }}
          >
            <Select
              placeholder="Seleccionar dia"
              style={{ width: 240 }}
              status={
                requiredFiledsError && daySelected === undefined ? "error" : ""
              }
              onChange={value => {
                const filterDays = availableDaysList.filter(
                  day => day.value === value,
                )

                const e = filterDays[0]

                setDaySelected({
                  id: e.id,
                  value: e.value.split("- ")[1],
                })

                const { hours } = availableDays.filter(
                  day => day.id === e.id,
                )[0]

                if (hours.length) {
                  const newList: { id: number; value: string }[] = []

                  hours.forEach(hour =>
                    newList.push(listHours.filter(item => item.id === hour)[0]),
                  )
                  setAvailableHoursList(newList)
                } else {
                  setAvailableHoursList([])
                }
              }}
              options={availableDaysList}
            />
            {availableHoursList?.length && (
              <Select
                placeholder="Horario"
                status={
                  requiredFiledsError && hourSelected === undefined
                    ? "error"
                    : ""
                }
                style={{ width: 100 }}
                onChange={value => {
                  const filterHours = availableHoursList.filter(
                    hour => hour.value === value,
                  )
                  setHourSelected({
                    id: filterHours[0].id,
                    value,
                  })
                }}
                options={availableHoursList}
              />
            )}
          </div>
          <div style={{ paddingTop: "15px" }}>
            <TextArea
              rows={2}
              placeholder="Breve descripción de la asesoría"
              value={brief}
              style={{ width: 350 }}
              status={requiredFiledsError && brief === "" ? "error" : ""}
              onChange={e => setBrief(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="req-button" style={{ paddingTop: "15px" }}>
        {disableRequestButton && (
          <Button
            loading={loadingSearch}
            type="primary"
            onClick={() => {
              setDisableRequestButton(false)
              searchAvailabilityAdmin()
            }}
          >
            Consultar disponibilidad
          </Button>
        )}
        {canRequest && (
          <Button
            loading={loadingReq}
            type="primary"
            onClick={() => {
              if (
                brief !== "" &&
                daySelected !== undefined &&
                hourSelected !== undefined
              ) {
                requestAdvisoryCall()
              } else {
                setRequiredFiledsError(true)
              }
            }}
          >
            Solicitar asesoría
          </Button>
        )}
      </div>
    </div>
  )
}

export default SearchByAdmin
