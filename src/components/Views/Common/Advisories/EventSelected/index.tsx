import React, { useState, useEffect, useContext } from "react"
import { AdvisoriesContext } from "contexts/Advisories"
import { BsDot } from "react-icons/bs"

import { Modal, Button, Input, DatePicker, TimePicker } from "antd"
import authenticate from "helpers/google/authenticate"
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons"
import { deleteEvent, editEvent } from "services/advisories/events.service"
import dayjs from "dayjs"

import {
  EventContainer,
  EventData,
  EventDataEdit,
  AdvisoryEvent,
} from "./styles"

interface EventDataInterface {
  id: number
  hour: string
  title: string
  description: string
  eventURL: string
  attendant: number[]
  date: string
}

function EventSelected({
  event,
  updateList,
}: {
  event: EventDataInterface
  updateList: (arg?: any) => void
}) {
  const { setServerError } = useContext(AdvisoriesContext)

  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const gapi = typeof window !== "undefined" && window.gapi
  // const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  // const SCOPES = "https://www.googleapis.com/auth/calendar"

  const { confirm } = Modal

  const [allowClick, setAllowClick] = useState<boolean>(false)
  const [canJoinEvent, setCanJoinEvent] = useState<boolean>(false)

  const [
    eventDataModal,
    setEventDataModal,
  ] = useState<EventDataInterface | null>(null)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)

  const [eventDataEdited, setEventDataEdited] = useState<EventDataInterface>(
    eventDataModal as EventDataInterface,
  )
  const [requiredError, setRequiredError] = useState<boolean>(false)

  const success = () => {
    Modal.success({
      content: "Accion realizada con exito",
      onOk() {
        setEventDataModal(null)
        setOpenEditModal(false)
        updateList()
      },
    })
  }

  const dateFormat = "DD/MM/YYYY"
  const { TextArea } = Input
  const timeFormat = "HH:mm"

  const editEventFunction = () => {
    const eventData = eventDataEdited as EventDataInterface

    const url = eventData.eventURL.split("eid=")
    const decodeEventId = atob(url[1])

    let splitDate: string[] = []
    if (eventData.date.split("/").length === 1) {
      splitDate = eventData.date.split("-")
    } else {
      splitDate = eventData.date.split("/")
    }

    const splitHour = eventData.hour.split(":")

    const dateFormated = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${splitHour[0]}:${splitHour[1]}:00-03:00`
    const endDateFormated = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${
      parseInt(splitHour[0], 10) + 1
    }:${splitHour[1]}:00-03:00`

    const eventToPatch = {
      summary: eventData.title,
      location: "",
      description: eventData.description,
      start: {
        dateTime: dateFormated,
        timeZone: "America/Buenos_Aires",
      },
      end: {
        dateTime: endDateFormated,
        timeZone: "America/Buenos_Aires",
      },
    }

    gapi.client.calendar.events
      .patch({
        calendarId: "primary",
        eventId: decodeEventId.split(" ")[0],
        alwaysIncludeEmail: true,
        sendUpdates: "all",
        sendNotifications: true,
        resource: eventToPatch,
      })
      .then(
        async (response: any) => {
          const editEventCall = await editEvent({
            id: eventData.id,
            title: eventData.title,
            description: eventData.description,
            hour: eventData.hour,
            date: `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}`,
            month: parseInt(splitDate[1], 10),
          })

          if (editEventCall.status === 201 && response.status === 200) {
            success()
          } else {
            setServerError(true)
          }
        },
        (err: any) => {
          // eslint-disable-next-line no-console
          console.error("Execute error", err)
        },
      )
  }

  const deleteEventFunction = () => {
    const eventData = eventDataModal as EventDataInterface

    const url = eventData.eventURL.split("eid=")
    const decodeEventId = atob(url[1])

    gapi.client.calendar.events
      .delete({
        calendarId: "primary",
        eventId: decodeEventId.split(" ")[0],
        sendNotifications: true,
        sendUpdates: "all",
      })
      .then(
        async (response: any) => {
          const deleteEventCall = await deleteEvent(eventData.id)
          if (deleteEventCall.status === 200 && response.status === 204) {
            success()
          } else {
            setServerError(true)
          }
        },
        (err: any) => {
          console.error("Execute error", err)
        },
      )
  }

  const getMeetURL = () => {
    const eventData = eventDataModal as EventDataInterface

    const url = eventData.eventURL.split("eid=")
    const decodeEventId = atob(url[1])
    gapi.client.calendar.events
      .get({
        calendarId: "primary",
        eventId: decodeEventId.split(" ")[0],
      })

      .then(
        (response: any) => {
          window.open(response.result.hangoutLink)
        },
        (err: any) => {
          console.error("Execute error", err)
        },
      )
  }

  const showConfirm = () => {
    confirm({
      title: "Estas seguro de que deseas eliminar el evento?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        authenticate(gapi, () => deleteEventFunction())
      },
      okText: "Eliminar",
      cancelText: "Cancelar",
    })
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

  useEffect(() => {
    const today = new Date()
    const month =
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : `0${today.getMonth() + 1}`
    const day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`
    const year = today.getFullYear()

    if (
      eventDataModal !== null &&
      eventDataModal.date === `${day}-${month}-${year}`
    ) {
      setCanJoinEvent(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventDataModal])

  return (
    <EventContainer>
      <Modal
        title={eventDataModal?.title}
        open={eventDataModal !== null}
        onCancel={() => {
          setEventDataModal(null)
        }}
        footer={[
          userData?.type === "admin" && !openEditModal && (
            <Button
              onClick={() => {
                setOpenEditModal(true)
                setEventDataEdited(eventDataModal as EventDataInterface)
              }}
              icon={<EditOutlined />}
            />
          ),
          userData?.type === "admin" && !openEditModal && (
            <Button danger icon={<DeleteOutlined />} onClick={showConfirm} />
          ),
          canJoinEvent && !openEditModal && (
            <Button
              type="primary"
              onClick={() => authenticate(gapi, () => getMeetURL())}
            >
              Unirme
            </Button>
          ),
          !openEditModal && (
            <Button
              onClick={() => window.open(event.eventURL)}
              type={!canJoinEvent ? "primary" : "default"}
            >
              Ver en Google Calendar
            </Button>
          ),
          openEditModal && (
            <>
              <Button
                onClick={() => {
                  setOpenEditModal(false)
                  setRequiredError(false)
                }}
              >
                Cancelar
              </Button>
              <Button
                // loading={loading}
                onClick={() => {
                  if (
                    eventDataEdited.title === "" ||
                    eventDataEdited.description === "" ||
                    eventDataEdited.date === "" ||
                    eventDataEdited.hour === ""
                  ) {
                    setRequiredError(true)
                    console.log("aca")
                  } else {
                    authenticate(gapi, () => editEventFunction())
                  }
                }}
                type="primary"
                disabled={!allowClick}
              >
                Guardar cambios
              </Button>
            </>
          ),
        ]}
      >
        {!openEditModal ? (
          <EventData>
            <span>
              {eventDataModal?.date.replaceAll("-", "/")}
              <BsDot />
              {eventDataModal?.hour} hs
            </span>
            <p className="description">{eventDataModal?.description}</p>
          </EventData>
        ) : (
          <EventDataEdit>
            <div className="input-container">
              {requiredError && (
                <p className="required">* Completa los campos requeridos</p>
              )}
              <div className="horizontal">
                <Input
                  placeholder="Titulo"
                  status={
                    requiredError && eventDataEdited.title === "" ? "error" : ""
                  }
                  value={eventDataEdited.title}
                  required
                  type="text"
                  width={400}
                  onChange={e => {
                    setEventDataEdited({
                      ...eventDataEdited,
                      title: e.target.value,
                    })
                  }}
                />
              </div>
              <div className="horizontal">
                <TextArea
                  rows={2}
                  placeholder="Descripcion"
                  value={eventDataEdited.description}
                  status={
                    requiredError && eventDataEdited.description === ""
                      ? "error"
                      : ""
                  }
                  onChange={e =>
                    setEventDataEdited({
                      ...eventDataEdited,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="horizontal">
                <DatePicker
                  placeholder="Fecha"
                  defaultValue={dayjs(
                    `${eventDataEdited.date.replaceAll("-", "/")}`,
                    dateFormat,
                  )}
                  status={
                    requiredError && eventDataEdited.date === "" ? "error" : ""
                  }
                  style={{ width: "200px" }}
                  format={dateFormat}
                  onChange={(e: any) => {
                    if (e !== null) {
                      const day = e.$D > 9 ? e.$D : `0${e.$D}`
                      const month = e.$M + 1 > 9 ? e.$M + 1 : `0${e.$M + 1}`

                      setEventDataEdited({
                        ...eventDataEdited,
                        date: `${day}/${month}/${e.$y}`,
                      })
                    }
                  }}
                />
                <TimePicker
                  defaultValue={dayjs(eventDataEdited.hour, "HH:mm")}
                  status={
                    requiredError && eventDataEdited.hour === "" ? "error" : ""
                  }
                  style={{ width: "200px" }}
                  placeholder="Horario"
                  format={timeFormat}
                  onChange={(e: any) => {
                    if (e !== null) {
                      const hour = e.$H > 9 ? e.$H : `0${e.$H}`
                      const minute = e.$m > 9 ? e.$m : `0${e.$m}`
                      setEventDataEdited({
                        ...eventDataEdited,
                        hour: `${hour}:${minute}`,
                      })
                    }
                  }}
                />
              </div>
            </div>
          </EventDataEdit>
        )}
      </Modal>

      <AdvisoryEvent
        onClick={() => {
          setEventDataModal(event)
        }}
        key={event.hour}
        type="button"
        eventType="event"
      >
        <div className="marker" />
        <p>
          {event.hour} <b>{event.title}</b>
        </p>
      </AdvisoryEvent>
    </EventContainer>
  )
}

export default EventSelected
