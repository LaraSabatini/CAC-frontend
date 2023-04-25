import React, { useState } from "react"
import InputSelect from "components/UI/InputSelect"
import { listHours, keysOfDays, keysOfDaysSpa } from "const/dates"
import Button from "components/UI/Button"
import Input from "components/UI/Input"
import getNextSevenDates from "helpers/dates/getNextSixDays"
import { AdvisoryInterface } from "interfaces/content/Advisories"
import ModalStatus from "components/UI/ModalStatus"
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
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [disableRequestButton, setDisableRequestButton] = useState<boolean>(
    true,
  )
  const [canRequest, setCanRequest] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

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
    if (adminSelected !== undefined) {
      const today = new Date()
      const days: string[] = getNextSevenDates(today)

      const getAvailabilityCall = await getAvailability(adminSelected.id)

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
        const date = new Date(`${splitDate[2]}-${splitDate[1]}/${splitDate[0]}`)

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

      const adminAgenda = getAdvisoriesByMonthAndAdminCall.data

      if (adminAgenda.length > 0) {
        const daysToRemoveAvailability: AdvisoryInterface[] = []
        leaveOnlyDaysWithHours.forEach(
          (day: { id: number; name: string; day: string; hours: number[] }) => {
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
              dayAndHour => dayAndHour.day === daysToRemoveAvailability[i].date,
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
                day.day.replaceAll("/", "-") === dayAndHourIdentifiers[i].day,
            )

            const indexOfDate = leaveOnlyDaysWithHours.findIndex(
              date => date === filterLeaveOnlyDaysWithHours[0],
            )
            indexOfDatesToEdit.push(indexOfDate)

            for (let a = 0; a < dayAndHourIdentifiers[i].hours.length; a += 1) {
              const indexOfId = filterLeaveOnlyDaysWithHours[0].hours.findIndex(
                hola => hola === dayAndHourIdentifiers[i].hours[a],
              )
              filterLeaveOnlyDaysWithHours[0].hours.splice(indexOfId, 1)
            }
          }
        }
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
      setDaySelected(otherList[0])

      const newList: { id: number; value: string }[] = []

      const { hours } = leaveOnlyDaysWithHours[0]
      hours.forEach(hour =>
        newList.push(listHours.filter(item => item.id === hour)[0]),
      )
      setAvailableHoursList(newList)
      setHourSelected(newList[0])
    }
  }

  const requestAdvisoryCall = async () => {
    if (daySelected !== undefined && hourSelected !== undefined) {
      const date: string[] = daySelected.value.split("-")
      // console.log(date[1].trim())
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
      setSuccess(requestAdvisoryReq.status === 201)
    }
  }

  return (
    <div>
      {requiredFiledsError && (
        <p className="req-fields">*Completa los campos requeridos</p>
      )}
      {success && (
        <ModalStatus
          title="Excelente!"
          description="La solicitud ha sido enviada con exito, en estos dias recibiras una respuesta."
          status="success"
          selfClose
          selfCloseAction={() => {
            setSuccess(false)
            close()
          }}
        />
      )}
      <InputSelect
        label="Seleccionar asesor"
        required
        width={380}
        onClick={e => {
          setDisableRequestButton(true)
          setAdminSelected(e)
          setAvailableDays(undefined)
          setAvailableDaysList(undefined)
        }}
        options={adminListForSelect}
      />

      {availableDays !== undefined && availableDaysList !== undefined && (
        <div>
          <div className="sub-container">
            <InputSelect
              label="Seleccionar dia"
              required
              width={210}
              onClick={e => {
                setDaySelected(e)

                const { hours } = availableDays.filter(
                  day => day.id === e.id,
                )[0]

                if (hours.length) {
                  const newList: { id: number; value: string }[] = []

                  hours.forEach(hour =>
                    newList.push(listHours.filter(item => item.id === hour)[0]),
                  )
                  setAvailableHoursList(newList)
                  setHourSelected(newList[0])
                } else {
                  setAvailableHoursList([])
                }
              }}
              options={availableDaysList}
            />
            {availableHoursList?.length && (
              <InputSelect
                label="Seleccionar horario"
                required
                width={155}
                onClick={e => setHourSelected(e)}
                options={availableHoursList}
              />
            )}
          </div>
          <Input
            label="Breve descripcion de la asesoria"
            width={360}
            required
            type="textarea"
            onChange={e => {
              setBrief(e.target.value)
            }}
          />
        </div>
      )}
      {disableRequestButton && (
        <div className="req-button">
          <Button
            content="Consulta disponibilidad"
            cta
            action={() => {
              setDisableRequestButton(false)
              searchAvailabilityAdmin()
            }}
          />
        </div>
      )}
      {canRequest && (
        <Button
          content="Solicitar asesoria"
          cta
          action={() => {
            if (brief !== "") {
              requestAdvisoryCall()
            } else {
              setRequiredFiledsError(true)
            }
          }}
        />
      )}
    </div>
  )
}

export default SearchByAdmin
