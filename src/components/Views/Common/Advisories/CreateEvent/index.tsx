/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react"
import { PublicEventsInterface } from "interfaces/content/Advisories"
import { AdvisoriesContext } from "contexts/Advisories"
import { createEvent } from "services/advisories/events.service"
import { getClientEmails } from "services/clients/clientActions.service"
import InternalServerError from "@components/Views/Common/Error/InternalServerError"
import { v4 as uuid } from "uuid"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { CalendarOutlined } from "@ant-design/icons"
import { Modal, Input, DatePicker, TimePicker } from "antd"
import { Container } from "./styles"
import { ScheduleAdvisory } from "../styles"

dayjs.extend(customParseFormat)
declare global {
  interface Window {
    gapi: any
  }
}

function CreateEvent({ updateList }: { updateList: (arg?: any) => void }) {
  const { setServerError } = useContext(AdvisoriesContext)

  const [createEventModal, setCreateEventModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [requiredError, setRequiredError] = useState<boolean>(false)
  const [newEvent, setNewEvent] = useState<PublicEventsInterface>({
    title: "",
    description: "",
    date: "",
    hour: "",
    month: 0,
    eventURL: "",
    attendant: [],
    createdBy: 0,
  })

  const cleanStates = () => {
    setNewEvent({
      title: "",
      description: "",
      date: "",
      hour: "",
      month: 0,
      eventURL: "",
      attendant: [],
      createdBy: 0,
    })
    setRequiredError(false)
    setLoading(false)
  }

  const dateFormat = "DD/MM/YYYY"
  const { TextArea } = Input
  const timeFormat = "HH:mm"

  const success = () => {
    Modal.success({
      content: "El evento se ha creado con exito",
      onOk() {
        setCreateEventModal(false)
        cleanStates()
        updateList()
      },
    })
  }

  const [allowClick, setAllowClick] = useState<boolean>(false)
  const [serverErrorModal, setServerErrorModal] = useState<boolean>(false)

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const gapi = typeof window !== "undefined" && window.gapi
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const SCOPES = "https://www.googleapis.com/auth/calendar"

  const createEventFunction = async () => {
    // CREAR EVENTO EN BDD
    const splitDate = newEvent.date.split("/")
    const splitHour = newEvent.hour.split(":")

    const dateFormated = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${splitHour[0]}:${splitHour[1]}:00-03:00`
    const endDateFormated = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${
      parseInt(splitHour[0], 10) + 1
    }:${splitHour[1]}:00-03:00`

    const clientEmails = await getClientEmails()

    if (clientEmails.status === 200) {
      const eventData = {
        summary: newEvent.title,
        location: "",
        description: newEvent.description,
        start: {
          dateTime: dateFormated,
          timeZone: "America/Buenos_Aires",
        },
        end: {
          dateTime: endDateFormated,
          timeZone: "America/Buenos_Aires",
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: [...clientEmails.data, { email: userData.user }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
          ],
        },
      }

      const request = gapi.client.calendar.events.insert({
        calendarId: "primary",
        sendNotifications: true,
        conferenceDataVersion: 1,
        resource: eventData,
      })

      request.execute(async (event: any) => {
        const createEventCall = await createEvent({
          ...newEvent,
          createdBy: userData.id,
          date: `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}`,
          month: parseInt(splitDate[1], 10),
          eventURL: event.htmlLink,
        })
        if (createEventCall.status === 201) {
          setLoading(false)
          success()
        } else {
          setServerError(true)
        }
      })
    } else {
      setServerErrorModal(true)
    }
  }

  const handleClientLoad = () => {
    if (
      newEvent.title === "" ||
      newEvent.description === "" ||
      newEvent.date === "" ||
      newEvent.hour === ""
    ) {
      setRequiredError(true)
    } else {
      setLoading(true)
      const openSignInPopup = () => {
        gapi.auth2.authorize(
          {
            client_id: CLIENT_ID,
            scope: SCOPES,
            plugin_name: "camara-federal-consorcio",
          },
          (res: any) => {
            if (res) {
              if (res.access_token) {
                localStorage.setItem("access_token", res.access_token)
                gapi.client.load("calendar", "v3", createEventFunction)
              }
            }
          },
        )
      }

      const initClient = () => {
        if (
          !localStorage.getItem("access_token") ||
          gapi.client.calendar === undefined
        ) {
          openSignInPopup()
        } else {
          createEventFunction()
        }
      }

      gapi.load("client:auth2", initClient)
    }
  }

  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.defer = true
    script.src = "https://apis.google.com/js/api.js"

    document.body.appendChild(script)

    script.addEventListener("load", () => {
      if (gapi) setAllowClick(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapi])

  return (
    <>
      <ScheduleAdvisory onClick={() => setCreateEventModal(true)}>
        <CalendarOutlined />
        Crear evento publico
      </ScheduleAdvisory>
      <Modal
        title="Crear evento publico"
        open={createEventModal}
        onOk={handleClientLoad}
        onCancel={() => {
          setCreateEventModal(false)
          cleanStates()
        }}
        okText="Crear"
        cancelText="Cancelar"
        confirmLoading={loading}
        okButtonProps={{ disabled: !allowClick }}
      >
        <InternalServerError
          visible={serverErrorModal}
          changeVisibility={() => setServerErrorModal(false)}
        />
        <Container>
          {requiredError && (
            <p className="required">* Completa los campos requeridos</p>
          )}
          <div className="input-container">
            <Input
              placeholder="Titulo"
              status={requiredError && newEvent.title === "" ? "error" : ""}
              value={newEvent.title}
              required
              type="text"
              width={400}
              onChange={e => {
                setNewEvent({ ...newEvent, title: e.target.value })
              }}
            />
          </div>
          <div className="input-container">
            <TextArea
              rows={2}
              placeholder="Descripcion"
              value={newEvent.description}
              status={
                requiredError && newEvent.description === "" ? "error" : ""
              }
              onChange={e =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <DatePicker
              placeholder="Fecha"
              defaultValue={dayjs("01/01/2023", dateFormat)}
              status={requiredError && newEvent.date === "" ? "error" : ""}
              style={{ width: "200px" }}
              format={dateFormat}
              onChange={(e: any) => {
                if (e !== null) {
                  const day = e.$D > 9 ? e.$D : `0${e.$D}`
                  const month = e.$M + 1 > 9 ? e.$M + 1 : `0${e.$M + 1}`

                  setNewEvent({
                    ...newEvent,
                    date: `${day}/${month}/${e.$y}`,
                  })
                }
              }}
            />

            <TimePicker
              defaultValue={dayjs("00:00", "HH:mm")}
              status={requiredError && newEvent.hour === "" ? "error" : ""}
              style={{ width: "200px" }}
              placeholder="Horario"
              format={timeFormat}
              onChange={(e: any) => {
                if (e !== null) {
                  const hour = e.$H > 9 ? e.$H : `0${e.$H}`
                  const minute = e.$m > 9 ? e.$m : `0${e.$m}`
                  setNewEvent({
                    ...newEvent,
                    hour: `${hour}:${minute}`,
                  })
                }
              }}
            />
          </div>
        </Container>
      </Modal>
    </>
  )
}

export default CreateEvent
