/* eslint-disable no-console */
import React, { useState, useEffect } from "react"
import Modal from "components/UI/Modal"
import { GrFormClose } from "react-icons/gr"
import { BsDot } from "react-icons/bs"
import { TbPencil } from "react-icons/tb"
import Button from "components/UI/Button"
import Input from "components/UI/Input"
import ModalStatus from "components/UI/ModalStatus"
import { deleteEvent, editEvent } from "services/advisories/events.service"
import DeleteEvent from "../DeleteEvent"
import {
  EventContainer,
  EventData,
  EventDataEdit,
  AdvisoryEvent,
} from "./styles"
import { Title, ButtonContainer } from "../CreateEvent/styles"

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
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const gapi = typeof window !== "undefined" && window.gapi
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const SCOPES = "https://www.googleapis.com/auth/calendar"

  const [modalSuccess, setModalSuccess] = useState<boolean>(false)

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

  const editEventFunction = () => {
    const eventData = eventDataEdited as EventDataInterface

    const url = eventData.eventURL.split("eid=")
    const decodeEventId = atob(url[1])

    const splitDate = eventData.date.split("/")
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
          setModalSuccess(
            editEventCall.status === 201 && response.status === 200,
          )
        },
        (err: any) => {
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
          setModalSuccess(
            deleteEventCall.status === 200 && response.status === 204,
          )
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

  const authenticate = (action: "delete" | "edit" | "meet") => {
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
              let functionToExecute
              if (action === "delete") {
                functionToExecute = deleteEventFunction
              } else if (action === "edit") {
                functionToExecute = editEventFunction
              } else {
                functionToExecute = getMeetURL
              }

              gapi.client.load("calendar", "v3", functionToExecute)
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
      } else if (openEditModal) {
        editEventFunction()
      } else {
        deleteEventFunction()
      }
    }

    gapi.load("client:auth2", initClient)
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
    const day = today.getDate()
    const year = today.getFullYear()

    if (
      eventDataModal !== null &&
      eventDataModal.date === `${day}-${month}-${year}`
    ) {
      setCanJoinEvent(true)
    }
  }, [eventDataModal])

  return (
    <EventContainer>
      {modalSuccess && (
        <ModalStatus
          title="Excelente!"
          description="El evento se ha modificado exitosamente"
          status="success"
          selfClose
          selfCloseAction={() => {
            setEventDataModal(null)
            setOpenEditModal(false)
            setModalSuccess(false)
            updateList()
          }}
        />
      )}
      {eventDataModal !== null && (
        <Modal>
          {!openEditModal ? (
            <EventData>
              <div className="title">
                <p>{eventDataModal.title}</p>
                <button
                  onClick={() => {
                    setEventDataModal(null)
                  }}
                  type="button"
                  className="close"
                >
                  <GrFormClose />
                </button>
              </div>
              <span>
                {eventDataModal.date.replaceAll("-", "/")}
                <BsDot />
                {eventDataModal.hour} hs
              </span>
              <p className="description">{eventDataModal.description}</p>
              <div className="buttons">
                {userData.type === "admin" && (
                  <div className="admin-buttons">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenEditModal(true)
                        setEventDataEdited({
                          ...eventDataModal,
                          date: eventDataModal.date.replaceAll("-", "/"),
                        })
                      }}
                    >
                      <TbPencil />
                    </button>

                    <DeleteEvent
                      allowClick={allowClick}
                      authenticate={() => authenticate("delete")}
                    />
                  </div>
                )}
                <div className="calendar-buttons">
                  {canJoinEvent && (
                    <Button
                      content="Unirme"
                      cta
                      action={
                        () => authenticate("meet")

                        // window.open(meetURL)
                      }
                    />
                  )}
                  <Button
                    content="Ver en Google Calendar"
                    cta={false}
                    action={() => window.open(event.eventURL)}
                  />
                </div>
              </div>
            </EventData>
          ) : (
            <EventDataEdit>
              <Title>Editar evento: {eventDataModal.title}</Title>
              <div className="input-container">
                <Input
                  label="Titulo"
                  required
                  type="text"
                  width={400}
                  value={eventDataEdited?.title}
                  onChange={e => {
                    setEventDataEdited({
                      ...eventDataEdited,
                      title: e.target.value,
                    })
                  }}
                />
                <Input
                  label="Descripcion"
                  required
                  type="textarea"
                  width={380}
                  value={eventDataEdited?.description}
                  onChange={e => {
                    setEventDataEdited({
                      ...eventDataEdited,
                      description: e.target.value,
                    })
                  }}
                />
                <div className="horizontal">
                  <Input
                    label="Fecha"
                    required
                    type="text"
                    placeholder="dd/mm/aaaa"
                    width={200}
                    value={eventDataEdited.date}
                    max={10}
                    onChange={e => {
                      if (e.target.value.length <= 12) {
                        setEventDataEdited({
                          ...eventDataEdited,
                          date: e.target.value,
                        })
                      }
                    }}
                  />
                  <Input
                    label="Horario"
                    required
                    type="text"
                    placeholder="hh:mm (24 horas)"
                    width={200}
                    value={eventDataEdited.hour}
                    onChange={e => {
                      if (e.target.value.length <= 5) {
                        setEventDataEdited({
                          ...eventDataEdited,
                          hour: e.target.value,
                        })
                      }
                    }}
                  />
                </div>
              </div>
              <ButtonContainer>
                <Button
                  content="Cancelar"
                  cta={false}
                  action={() => setOpenEditModal(false)}
                />
                <Button
                  content="Guardar Cambios"
                  disabled={!allowClick}
                  cta
                  action={() => authenticate("edit")}
                />
              </ButtonContainer>
            </EventDataEdit>
          )}
        </Modal>
      )}
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
