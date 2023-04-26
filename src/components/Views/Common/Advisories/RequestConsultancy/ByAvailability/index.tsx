import React, { useState } from "react"
import {
  getAllAdvisoriesByMonth,
  getAllAvailability,
  requestAdvisory,
} from "services/advisories/advisories.service"
import {
  AdvisoryInterface,
  AdvisoryAvailavilityInterface,
} from "interfaces/content/Advisories"
import ModalStatus from "components/UI/ModalStatus"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import InputSelect from "components/UI/InputSelect"
import Input from "components/UI/Input"
import Button from "components/UI/Button"
import { listHours, keysOfDays } from "const/dates"
import { NoAvailability } from "../styles"

type AdminType = { id: number; userName: string; email: string }

function SearchByAvailability({
  adminList,
  close,
}: {
  adminList: AdminType[]
  close: (arg?: any) => void
}) {
  const userData = JSON.parse(localStorage.getItem("userData") as string)
  const [serverError, setServerError] = useState<boolean>(false)

  const [searchValues, setSearchValues] = useState<{
    date: string
    hour: { id: number; value: string }
  }>({
    date: "",
    hour: listHours[0],
  })
  const [disableRequestButton, setDisableRequestButton] = useState<boolean>(
    true,
  )

  const [success, setSuccess] = useState<boolean>(false)

  const [canRequest, setCanRequest] = useState<boolean>(false)

  const [requiredFiledsError, setRequiredFiledsError] = useState<boolean>(false)

  const [brief, setBrief] = useState<string>("")

  const [adminsAvailable, setAdminsAvailable] = useState<
    {
      id: number
      userName: string
      email: string
    }[]
  >([])
  const [noResults, setNoResults] = useState<boolean>(false)

  const [adminSelected, setAdminSelected] = useState<{
    id: number
    value: string
  }>()

  const searchAvailabilityByTime = async () => {
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
      setAdminSelected(
        finalListOfAdmins.length
          ? {
              id: finalListOfAdmins[0].id,
              value: finalListOfAdmins[0].userName,
            }
          : undefined,
      )
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
    setSuccess(requestAdvisoryReq.status === 201)
    setServerError(requestAdvisoryReq.status !== 201)
  }

  return (
    <>
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
      {serverError && (
        <InternalServerError
          visible
          changeVisibility={() => setServerError(false)}
        />
      )}
      {requiredFiledsError && (
        <p className="req-fields">*Completa los campos requeridos</p>
      )}
      <div className="sub-container">
        <Input
          label="Fecha"
          placeholder="dd/mm/aaaa"
          width={185}
          required
          type="text"
          onChange={e => {
            setSearchValues({ ...searchValues, date: e.target.value })
            setDisableRequestButton(true)
            setCanRequest(false)
            setAdminsAvailable([])
            setNoResults(false)
          }}
        />

        <InputSelect
          label="Seleccionar horario"
          required
          width={180}
          onClick={e => {
            setSearchValues({ ...searchValues, hour: e })
            setDisableRequestButton(true)
            setCanRequest(false)
            setAdminsAvailable([])
            setNoResults(false)
          }}
          options={listHours}
        />
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

      {adminsAvailable.length ? (
        <InputSelect
          label="Seleccionar asesor"
          required
          width={380}
          options={cleanOptions()}
          onClick={(e: { id: number; value: string }) => {
            setAdminSelected(e)
          }}
        />
      ) : (
        <></>
      )}
      {noResults && (
        <NoAvailability>
          No hay disponibilidad
          <span>Intenta con otra fecha u horario</span>
        </NoAvailability>
      )}
      {disableRequestButton && (
        <div className="req-button">
          <Button
            content="Consulta asesores disponibles"
            cta
            action={() => {
              if (searchValues.date.split("/").length === 3) {
                searchAvailabilityByTime()
                setDisableRequestButton(false)
                setRequiredFiledsError(false)
              } else {
                setRequiredFiledsError(true)
              }
            }}
          />
        </div>
      )}
      {canRequest && !noResults && (
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
    </>
  )
}

export default SearchByAvailability
