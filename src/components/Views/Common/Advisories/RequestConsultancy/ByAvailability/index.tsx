import React, { useState, useContext } from "react"
import {
  getAllAdvisoriesByMonth,
  getAllAvailability,
  requestAdvisory,
} from "services/advisories/advisories.service"
import { AdvisoriesContext } from "contexts/Advisories"
import {
  AdvisoryInterface,
  AdvisoryAvailavilityInterface,
} from "interfaces/content/Advisories"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { dateFormated } from "helpers/dates/getToday"
import { Input, Select, Button, Modal, DatePicker } from "antd"

import { listHours, keysOfDays } from "const/dates"
import { NoAvailability } from "../styles"

type AdminType = { id: number; userName: string; email: string }

dayjs.extend(customParseFormat)

function SearchByAvailability({
  adminList,
  close,
}: {
  adminList: AdminType[]
  close: (arg?: any) => void
}) {
  const { setServerError } = useContext(AdvisoriesContext)

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const dateFormat = "DD/MM/YYYY"
  const { TextArea } = Input

  const [searchValues, setSearchValues] = useState<{
    date: string
    hour: { id: number; value: string }
  }>({
    date: `${dateFormated.replaceAll("-", "/")}`,
    hour: { id: 0, value: "" },
  })

  const [brief, setBrief] = useState<string>("")
  const [adminsAvailable, setAdminsAvailable] = useState<
    {
      id: number
      userName: string
      email: string
    }[]
  >([])

  const [adminSelected, setAdminSelected] = useState<{
    id: number
    value: string
  }>()

  const success = () => {
    Modal.success({
      title: "¡Excelente!",
      content: "Tu solicitud se ha enviado con éxito",
      onOk() {
        close()
        setBrief("")
        setAdminsAvailable([])
        setAdminSelected(undefined)
      },
    })
  }

  const [disableRequestButton, setDisableRequestButton] = useState<boolean>(
    true,
  )

  const [canRequest, setCanRequest] = useState<boolean>(false)

  const [requiredFiledsError, setRequiredFiledsError] = useState<boolean>(false)
  const [loadingReq, setLoadingReq] = useState<boolean>(false)
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false)

  const [noResults, setNoResults] = useState<boolean>(false)

  const searchAvailabilityByTime = async () => {
    setLoadingSearch(true)
    let adminsAvailableForAdvisory = adminList
    setCanRequest(true)

    const splitDate = searchValues.date.split("/")
    const day = parseInt(splitDate[0], 10)
    const month = parseInt(splitDate[1], 10)
    const year = parseInt(splitDate[2], 10)

    const getAdvisoriesCall = await getAllAdvisoriesByMonth(month)

    const getAllAvailabilityCall = await getAllAvailability()

    if (getAdvisoriesCall.status === 201) {
      const searchBlockedDates = getAdvisoriesCall.data.filter(
        (advisory: AdvisoryInterface) =>
          advisory.date === searchValues.date.replaceAll("/", "-"),
      )
      if (searchBlockedDates.length > 0) {
        // chequear el horario
        const blockedDayAndHour: AdvisoryInterface[] = []
        searchBlockedDates.forEach(
          (advisory: AdvisoryInterface) =>
            advisory.hour === searchValues.hour.value &&
            blockedDayAndHour.push(advisory),
        )

        if (blockedDayAndHour.length > 0) {
          const adminIds: number[] = []
          blockedDayAndHour.forEach((advisory: AdvisoryInterface) =>
            adminIds.push(advisory.adminId),
          )

          const removeAdminsById = (
            admins: { id: number; userName: string; email: string }[],
            idsToRemove: number[],
          ): { id: number; userName: string; email: string }[] => {
            return admins.filter(admin => !idsToRemove.includes(admin.id))
          }

          const list: AdminType[] = removeAdminsById(adminList, adminIds)
          adminsAvailableForAdvisory = list
        }
      }
      setLoadingSearch(false)
    } else {
      setServerError(true)
    }

    const adminIds: number[] = []
    adminsAvailableForAdvisory.forEach(admin => adminIds.push(admin.id))

    if (getAllAvailabilityCall.status === 200) {
      const filterAdminsToCheck = getAllAvailabilityCall.data.filter(
        (availability: AdvisoryAvailavilityInterface) =>
          adminIds.includes(availability.adminId),
      )
      const date = new Date(`${year}/${month}/${day}`)

      const dayName: any = keysOfDays[date.getDay()].value

      const availabilityList: AdvisoryAvailavilityInterface[] = []
      filterAdminsToCheck.map((availability: AdvisoryAvailavilityInterface) =>
        availabilityList.push({
          id: availability.id,
          adminId: availability.adminId,
          availability: JSON.parse(availability.availability as string),
        }),
      )

      const finalAvailabilityList: {
        available: boolean
        adminId: number
      }[] = []

      availabilityList.forEach(
        (availability: AdvisoryAvailavilityInterface) => {
          const key: any = availability.availability[dayName]
          finalAvailabilityList.push({
            available: key.indexOf(searchValues.hour.id) !== -1,
            adminId: availability.adminId,
          })
        },
      )

      const filterAdminsAvailable = finalAvailabilityList.filter(
        availability => availability.available,
      )

      const idsOfAdminsAvailable: number[] = []
      filterAdminsAvailable.forEach(admin =>
        idsOfAdminsAvailable.push(admin.adminId),
      )

      const finalListOfAdmins = adminList.filter(
        admin => idsOfAdminsAvailable.indexOf(admin.id) !== -1,
      )

      setAdminsAvailable(finalListOfAdmins)

      setNoResults(finalListOfAdmins.length === 0)
    } else {
      setServerError(true)
    }
  }

  const cleanOptions = () => {
    const options: { id: number; value: string }[] = []
    adminsAvailable.forEach(admin =>
      options.push({ id: admin.id, value: admin.userName }),
    )

    return options
  }

  const requestAdvisoryCall = async () => {
    setLoadingReq(true)
    const requestAdvisoryData: AdvisoryInterface = {
      adminId: adminSelected?.id as number,
      clientId: userData.id as number,
      date: searchValues.date.replaceAll("/", "-"),
      hour: searchValues.hour.value,
      month: parseInt(searchValues.date.split("/")[1], 10),
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

  return (
    <>
      {requiredFiledsError && (
        <p style={{ color: "#c12929" }} className="req-fields">
          *Completa los campos requeridos
        </p>
      )}
      <div
        className="sub-container"
        style={{
          paddingTop: "15px",
          display: "flex",
          gap: "10px",
        }}
      >
        <DatePicker
          placeholder="Fecha"
          defaultValue={dayjs(
            `${dateFormated.replaceAll("-", "/")}`,
            dateFormat,
          )}
          status={
            requiredFiledsError && searchValues.date === "" ? "error" : ""
          }
          style={{ width: "250px" }}
          format={dateFormat}
          onChange={(e: any) => {
            if (e !== null) {
              const day = e.$D > 9 ? e.$D : `0${e.$D}`
              const month = e.$M + 1 > 9 ? e.$M + 1 : `0${e.$M + 1}`

              setSearchValues({
                ...searchValues,
                date: `${day}/${month}/${e.$y}`,
              })
              setDisableRequestButton(true)
              setCanRequest(false)
              setAdminsAvailable([])
              setNoResults(false)
            }
          }}
        />

        <Select
          placeholder="Horario"
          style={{ width: "90px" }}
          status={
            requiredFiledsError && searchValues.hour.value === "" ? "error" : ""
          }
          defaultValue={searchValues?.hour.value}
          onChange={(e: string) => {
            const filterHours = listHours.filter(hour => hour.value === e)
            setSearchValues({
              ...searchValues,
              hour: {
                id: filterHours[0].id,
                value: e,
              },
            })
            setDisableRequestButton(true)
            setCanRequest(false)
            setAdminsAvailable([])
            setNoResults(false)
          }}
          options={listHours}
        />
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
      <div style={{ paddingTop: "15px" }}>
        {adminsAvailable.length ? (
          <Select
            placeholder="Seleccionar asesor"
            style={{ width: "350px" }}
            status={
              requiredFiledsError && adminSelected === undefined ? "error" : ""
            }
            onChange={(e: string) => {
              const options = cleanOptions()
              const filterAdmins = options.filter(admin => admin.value === e)
              setAdminSelected(filterAdmins[0])
            }}
            options={cleanOptions()}
          />
        ) : (
          <></>
        )}
      </div>

      {noResults && (
        <NoAvailability>
          No hay disponibilidad
          <span>Intenta con otra fecha u horario</span>
        </NoAvailability>
      )}
      <div className="req-button" style={{ paddingTop: "15px" }}>
        {disableRequestButton && (
          <Button
            loading={loadingSearch}
            type="primary"
            onClick={() => {
              if (searchValues.date.split("/").length === 3) {
                searchAvailabilityByTime()
                setDisableRequestButton(false)
                setRequiredFiledsError(false)
              } else {
                setRequiredFiledsError(true)
              }
            }}
          >
            Consultar asesores disponibles
          </Button>
        )}
        {canRequest && !noResults && (
          <Button
            loading={loadingReq}
            type="primary"
            onClick={() => {
              if (
                brief !== "" &&
                searchValues.date !== "" &&
                searchValues.hour.value !== "" &&
                adminSelected !== undefined
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
    </>
  )
}

export default SearchByAvailability
