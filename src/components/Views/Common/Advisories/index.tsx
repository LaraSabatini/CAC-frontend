/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react"
import Header from "components/Views/Common/Header"
import { AdvisoriesContext } from "contexts/Advisories"
import { getAdvisories } from "services/advisories/advisories.service"
import { getEventsByMonth } from "services/advisories/events.service"
import { AiFillSchedule } from "react-icons/ai"
import { GrFormClose } from "react-icons/gr"
import { FaRegTrashAlt, FaCalendarWeek, FaCalendarPlus } from "react-icons/fa"
import { BsDot } from "react-icons/bs"
import { TbPencil } from "react-icons/tb"
import formatDateToCompare, {
  stringToDate,
} from "helpers/dates/formatDateToCompare"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

import getCalendarMonth from "helpers/dates/getCalendarMonth"
import compareDates from "helpers/dates/compareDates"
import Modal from "components/UI/Modal"
import { months, days } from "const/dates"
import Button from "components/UI/Button"
import Availability from "./Availability"
import CreateEvent from "./CreateEvent"
import {
  Container,
  Calendar,
  DateInfo,
  CalendarInfo,
  NavigateButtons,
  ScheduleAdvisory,
  CalendarDisplay,
  DateView,
  Days,
  AdvisoryEvent,
  EventContainer,
  EventData,
} from "./styles"

function AdvisoriesView() {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const [allowClick, setAllowClick] = useState<boolean>(false)

  const {
    advisoryList,
    setAdvisoryList,
    setPublicEventList,
    publicEventList,
  } = useContext(AdvisoriesContext)

  const today = new Date()

  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1)
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear())

  const [availabilityModal, setAvailabilityModal] = useState<boolean>(false)
  const [createEventModal, setCreateEvent] = useState<boolean>(false)
  const [eventDataModal, setEventDataModal] = useState<{
    id: number
    hour: string
    title: string
    description: string
    eventURL: string
    attendant: number[]
    date: string
  } | null>(null)

  const [updateList, setUpdateList] = useState<number>(0)

  const [dates, setDates] = useState<Date[]>(
    getCalendarMonth(today.getFullYear(), today.getMonth() + 1),
  )

  const getAdvisoryList = async () => {
    const getAdvisoriesCall = await getAdvisories(
      userData?.id,
      currentMonth,
      userData?.type,
    )
    setAdvisoryList(getAdvisoriesCall.data)

    const getEventsByMonthCall = await getEventsByMonth(currentMonth)
    setPublicEventList(getEventsByMonthCall.data)
  }

  const searchAdvisory = (index: number) => {
    const advisory = advisoryList.filter(
      advisoryEvent =>
        stringToDate(advisoryEvent.date).getTime() === dates[index].getTime(),
    )

    return advisory.length === 0
      ? null
      : {
          hour: advisory[0].hour,
          client: advisory[0].clientName,
        }
  }

  const searchEvent = (index: number) => {
    const event = publicEventList.filter(
      eventDate =>
        stringToDate(eventDate.date).getTime() === dates[index].getTime(),
    )

    const eventList: {
      id: number
      hour: string
      title: string
      description: string
      eventURL: string
      attendant: number[]
      date: string
    }[] = []

    if (event.length) {
      event.map(ev =>
        eventList.push({
          id: ev.id as number,
          hour: ev.hour,
          title: ev.title,
          description: ev.description,
          eventURL: ev.eventURL,
          date: ev.date,
          attendant:
            ev.attendant === "" ? [] : JSON.parse(ev.attendant as string),
        }),
      )
    }

    return eventList
  }

  useEffect(() => {
    setDates(getCalendarMonth(currentYear, currentMonth))
    getAdvisoryList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, updateList])

  // ----------------------------------------------------

  const gapi = typeof window !== "undefined" && window.gapi
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const SCOPES = "https://www.googleapis.com/auth/calendar"

  const funcion = () => {
    console.log("se ejecuta", gapi)

    const url = eventDataModal?.eventURL.split("eid=")
    gapi.client.calendar.events
      .delete({
        calendarId: "primary",
        eventId: url !== undefined && url[1],
      })
      .then(
        (response: any) => {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response)
        },
        (err: any) => {
          console.error("Execute error", err)
        },
      )
  }

  const authenticate = () => {
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
              gapi.client.load("calendar", "v3", funcion)
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
        // createEventFunction()
        console.log("esta logueado")
        funcion()
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

  console.log(gapi)

  return (
    <>
      <Header />
      <Container>
        <Calendar>
          <CalendarInfo>
            <DateInfo>
              <NavigateButtons>
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 1) {
                      setCurrentMonth(12)
                      setCurrentYear(currentYear - 1)
                    } else {
                      setCurrentMonth(currentMonth - 1)
                    }
                  }}
                >
                  <FiChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 12) {
                      setCurrentMonth(1)
                      setCurrentYear(currentYear + 1)
                    } else {
                      setCurrentMonth(currentMonth + 1)
                    }
                  }}
                >
                  <FiChevronRight />
                </button>
              </NavigateButtons>
              <p>
                {
                  months.filter(
                    (monthItem: { id: number; name: string }) =>
                      monthItem.id === currentMonth,
                  )[0].name
                }
                <span>{currentYear}</span>
              </p>
            </DateInfo>

            {userData?.type === "client" ? (
              <ScheduleAdvisory>
                <FaCalendarWeek />
                Solicitar asesoria
              </ScheduleAdvisory>
            ) : (
              <div className="admin-buttons">
                <ScheduleAdvisory onClick={() => setCreateEvent(true)}>
                  <FaCalendarPlus />
                  Crear evento publico
                </ScheduleAdvisory>
                <ScheduleAdvisory onClick={() => setAvailabilityModal(true)}>
                  <AiFillSchedule />
                  Agregar / Modificar disponibilidad
                </ScheduleAdvisory>
              </div>
            )}
          </CalendarInfo>
          <Days>
            {days.map(day => (
              <p key={day.id}>{day.nameAbb}</p>
            ))}
          </Days>
          <CalendarDisplay>
            {dates.map((date, index) => (
              <DateView
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                past={
                  !compareDates(formatDateToCompare(dates[index], currentYear))
                }
              >
                <p>{date.getDate()}</p>
                {searchAdvisory(index) !== null ? (
                  <AdvisoryEvent type="button" eventType="advisory">
                    <div className="marker" />
                    <p>
                      {searchAdvisory(index)?.hour} asesoria con{" "}
                      <b>{searchAdvisory(index)?.client}</b>
                    </p>
                  </AdvisoryEvent>
                ) : (
                  <></>
                )}
                {searchEvent(index) !== null ? (
                  searchEvent(index).map(event => (
                    <EventContainer>
                      {eventDataModal !== null && (
                        <Modal>
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
                            <p className="description">
                              {eventDataModal.description}
                            </p>
                            <div className="buttons">
                              {userData.type === "admin" && (
                                <div className="admin-buttons">
                                  <button type="button">
                                    <TbPencil />
                                  </button>
                                  <button
                                    type="button"
                                    className="trash"
                                    disabled={!allowClick}
                                    onClick={() =>
                                      // deleteEvent(event.id, event.eventURL)
                                      // handleClientLoad()
                                      authenticate()
                                    }
                                  >
                                    <FaRegTrashAlt />
                                  </button>
                                </div>
                              )}
                              <Button
                                content="Ver en Google Calendar"
                                cta
                                action={() => window.open(event.eventURL)}
                              />
                            </div>
                          </EventData>
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
                  ))
                ) : (
                  <></>
                )}
              </DateView>
            ))}
          </CalendarDisplay>
        </Calendar>
        {availabilityModal && (
          <Availability closeModal={() => setAvailabilityModal(false)} />
        )}
        {createEventModal && (
          <CreateEvent
            closeModal={() => {
              setCreateEvent(false)
              setUpdateList(updateList + 1)
            }}
          />
        )}
      </Container>
    </>
  )
}

export default AdvisoriesView
