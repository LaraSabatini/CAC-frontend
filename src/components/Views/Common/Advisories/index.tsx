/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react"
import Header from "components/Views/Common/Header"
import { AdvisoryInterface } from "interfaces/content/Advisories"
import { AdvisoriesContext } from "contexts/Advisories"
import { getAdvisories } from "services/advisories/advisories.service"
import { getEventsByMonth } from "services/advisories/events.service"
import { AiFillSchedule } from "react-icons/ai"
import { FaCalendarWeek, FaCalendarPlus } from "react-icons/fa"
import formatDateToCompare, {
  stringToDate,
} from "helpers/dates/formatDateToCompare"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import getCalendarMonth from "helpers/dates/getCalendarMonth"
import compareDates from "helpers/dates/compareDates"
import { months, days } from "const/dates"
import InternalServerError from "components/Views/Common/Error/InternalServerError"
import RequestAdvisory from "./RequestConsultancy"
import Availability from "./Availability"
import CreateEvent from "./CreateEvent"
import EventSelected from "./EventSelected"
import AdvisorySelected from "./AdvisorySelected"

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

function AdvisoriesView() {
  const userData = JSON.parse(localStorage.getItem("userData") as string)

  const {
    advisoryList,
    setAdvisoryList,
    setPublicEventList,
    publicEventList,
    serverError,
    setServerError,
  } = useContext(AdvisoriesContext)

  const today = new Date()

  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1)
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear())

  const [availabilityModal, setAvailabilityModal] = useState<boolean>(false)
  const [createEventModal, setCreateEvent] = useState<boolean>(false)

  const [requestAdvisoryModal, setRequestAdvisoryModal] = useState<boolean>(
    false,
  )

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

    setAdvisoryList(getAdvisoriesCall.status === 201 && getAdvisoriesCall.data)

    const getEventsByMonthCall = await getEventsByMonth(currentMonth)
    setPublicEventList(
      getEventsByMonthCall.status === 200 && getEventsByMonthCall.data,
    )

    setServerError(
      getAdvisoriesCall.status !== 201 || getEventsByMonthCall.status !== 200,
    )
  }

  const searchAdvisory = (index: number) => {
    const advisory = advisoryList.filter(
      advisoryEvent =>
        stringToDate(advisoryEvent.date).getTime() === dates[index].getTime(),
    )
    const advisoryListArray: AdvisoryInterface[] = []

    if (advisory.length) {
      advisory.map(ev => advisoryListArray.push(ev))
    }

    return advisoryListArray
  }

  const searchEvent = (index: number) => {
    const event = publicEventList.filter(
      eventDate =>
        stringToDate(eventDate.date).getTime() === dates[index].getTime(),
    )

    const eventList: EventDataInterface[] = []

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

  return (
    <>
      <Header />

      <Container>
        <InternalServerError
          visible={serverError}
          changeVisibility={() => setServerError(false)}
        />
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
              <ScheduleAdvisory onClick={() => setRequestAdvisoryModal(true)}>
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
                {advisoryList.length && searchAdvisory(index) !== null ? (
                  searchAdvisory(index).map(event => (
                    <AdvisorySelected
                      key={event.id}
                      event={event}
                      updateList={() => setUpdateList(updateList + 1)}
                    />
                  ))
                ) : (
                  <></>
                )}
                {publicEventList.length && searchEvent(index) !== null ? (
                  searchEvent(index).map(event => (
                    <EventSelected
                      key={event.id}
                      event={event}
                      updateList={() => setUpdateList(updateList + 1)}
                    />
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
        {requestAdvisoryModal && (
          <RequestAdvisory
            close={() => {
              setRequestAdvisoryModal(false)
              setUpdateList(updateList + 1)
            }}
          />
        )}
      </Container>
    </>
  )
}

export default AdvisoriesView
